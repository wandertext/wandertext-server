const firestore = require("./connect-to-firestore");

const newIds = {
  msk2235: "LspEczeDMaVtVCpe15c9c7miqdc2",
  txc2000: "OXWzx5RRcOQApQdFG6eSsW49Hlm2",
  yx2398: "OouNPMWw2LgUoxB9zT8Pi0ymGvj2",
  bmg2139: "RGvVyZxgpmOfIdPlMf2gd0zn0oD2",
  jjt2159: "TzkagOKIH7TdF3jDRPSbJACcO9G3",
  itp2107: "UOb1XyJYwKWQVW7e6f3MG02ticx1",
  muziejus: "Z4aKFSu4FNYvB17YJUOx0hjlPH52",
  asr2210: "Z7UvsVHz0SgGR6J6s5fXv6mRqaA2",
  mae: "gNBoxzdCcFVOAuaSFuBIvgiOBp12",
  ecf2148: "iq2WwydjR9cdE4MnWcZ4S2P0Fzw1",
  jls2336: "nqXNF288RaTzmtc5jpKwGX6XKVO2",
  xc2509: "pI1dHnEU15VR0e6Q2zgZ2Gk2oAE3",
  iat2111: "zikNAy1txdgumLNADNEz84mzTdt2"
};

const run = async () => {
  const db = firestore();
  const entries = await db
    .collection("entries")
    .where("text", "==", "baburnama-1530")
    .get()
    .then(r => r.docs.map(d => d.data()));

  for (const entry of entries) {
    let contributors;
    let revisionIds;
    if (!entry.revisionIds) {
      revisionIds = await db
        .collection(`entries/${entry.id}/revisions`)
        .get()
        .then(r => r.docs.map(d => d.id));
      if (revisionIds.length > 0) {
        const lastRevision = await db
          .doc(
            `entries/${entry.id}/revisions/${
              revisionIds[revisionIds.length - 1]
            }`
          )
          .get()
          .then(d => d.data());
        contributors = lastRevision.contributors.concat(entry.contributors);
        contributors = [
          ...new Set(
            contributors.map(contributor => {
              if (newIds[contributor]) {
                return newIds[contributor];
              }

              return contributor;
            })
          )
        ];
      }

      await db.doc(`entries/${entry.id}`).update({ revisionIds, contributors });
    }
  }
};

run();
