import expressApp from "./app";

const port = process.env.PORT || 4040

const app = expressApp();

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
