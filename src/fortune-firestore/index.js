"use strict";

import Firestore from "@google-cloud/firestore";
import applyUpdate from "fortune/lib/common/apply_update";

export default Adapter =>
  class FirestoreAdapter extends Adapter {
    connect() {
      if (!this._db) {
        this._db = new Firestore({
          projectId: this.options.projectId,
          credentials: {
            client_email: this.options.client_email,
            private_key: this.options.private_key
          }
        });
      }

      return Promise.resolve();
    }

    disconnect() {
      if (this._db) {
        this._db = null;
      }

      return Promise.resolve();
    }

    _get(type, key) {
      const collection = this.options.typeMap[type];
      return new Promise((resolve, reject) =>
        this._db
          .doc(`${collection}/${key}`)
          .get()
          .then(ref => resolve(ref.data()))
          .catch(error => reject(error))
      );
    }

    find(type, ids) {
      const collection = this.options.typeMap[type];
      if (ids && ids.length === 0) {
        return super.find();
      }

      if (!ids) {
        return this._db
          .collection(collection)
          .get()
          .then(ref => ref.docs.map(doc => doc.data()))
          .catch(error => console.log(error));
      }

      const promises = [];
      ids.forEach(id => {
        return promises.push(
          this._db
            .doc(`${collection}/${id}`)
            .get()
            .then(doc => doc.data())
            .catch(error => console.log(error))
        );
      });
      return Promise.all(promises);
    }

    update(type, updates) {
      if (updates.length === 0) return super.update();

      return Promise.all(
        updates.map(update =>
          this._get(type, update.id).then(record => {
            if (!record) {
              return 0;
            }

            applyUpdate(record, update);
            const collection = this.options.typeMap[type];
            return this._db
              .doc(`${collection}/${update.id}`)
              .update(record)
              .then(() => 1)
              .catch(() => 0);
          })
        )
      ).then(results => {
        return results.reduce((num, result) => {
          num += result;
          return num;
        }, 0);
      });
    }
  };
