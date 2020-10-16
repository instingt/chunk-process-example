// function download(data, fileName) {
//   const link = document.createElement('a');
//   link.style = "display: none;";
//   document.body.appendChild(a);

//   const json = JSON.stringify(data, null, 2);
//   const blob = new Blob([json], {type: 'octet/stram'});
//   const url = window.URL.createObjectURL(blob);

//   link.href = url;
//   link.download = fileName;
//   link.click();

//   window.URL.revokeObjectURL(url);
//   link.remove();
// }

const CHUNK_SIZE = 256 * 1024 * 1024;
const fileInput = document.getElementById("file");
const btn = document.getElementById("process");
const chunks = [];

btn.addEventListener("click", async function (e) {
  const file = fileInput.files[0];

  let pointer = 0;

  while (pointer < file.size) {
    const blob = file.slice(pointer, pointer + CHUNK_SIZE);

    const chunk = await readChunk(blob);

    chunks.push(chunk);
    pointer += CHUNK_SIZE;

    console.log(`Processed: ${pointer} of ${file.size}`);
  }

  download(chunks, "newFile");
});

function readChunk(blob) {
  return new Promise((resolve) => {
    const fr = new FileReader();

    fr.onload = function (e) {
      resolve(process(e.target.result));
    };

    fr.readAsArrayBuffer(blob);
  });
}

function process(buffer) {
  return new Int8Array(buffer).map((val) => val + 1);
}

function download(data, fileName) {
  const link = document.createElement("a");
  link.style = "display: none;";
  document.body.appendChild(link);

  const blob = new Blob(data, { type: "octet/stram" });
  const url = window.URL.createObjectURL(blob);

  link.href = url;
  link.download = fileName;
  link.click();

  window.URL.revokeObjectURL(url);
  link.remove();
}
