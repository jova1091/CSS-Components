export function init(container = document) {
  container.querySelectorAll(".dropzone[data-dropzone]").forEach((dz) => {
    if (dz._dropzoneInit) return;
    dz._dropzoneInit = true;

    const input = dz.querySelector(".dropzone-input");
    const fileList = dz.querySelector(".dropzone-files");
    let files = [];

    if (!input || !fileList) return;

    dz.addEventListener("click", (e) => {
      if (e.target.closest(".dropzone-file-remove")) return;
      input.click();
    });

    input.addEventListener("change", () => {
      const newFiles = Array.from(input.files);
      files = files.concat(newFiles);
      renderFiles();
      input.value = "";
    });

    ["dragenter", "dragover", "dragleave", "drop"].forEach((ev) => {
      dz.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    ["dragenter", "dragover"].forEach((ev) => {
      dz.addEventListener(ev, () => {
        dz.classList.add("dropzone--dragover");
      });
    });

    ["dragleave", "drop"].forEach((ev) => {
      dz.addEventListener(ev, (e) => {
        dz.classList.remove("dropzone--dragover");
      });
    });

    dz.addEventListener("drop", (e) => {
      const droppedFiles = Array.from(e.dataTransfer.files);
      files = files.concat(droppedFiles);
      renderFiles();
    });

    function renderFiles() {
      fileList.innerHTML = "";

      files.forEach((file, index) => {
        const li = document.createElement("li");
        li.className = "dropzone-file";

        const nameSpan = document.createElement("span");
        nameSpan.className = "dropzone-file-name";
        nameSpan.textContent = file.name;

        const sizeSpan = document.createElement("span");
        sizeSpan.className = "dropzone-file-size";
        sizeSpan.textContent = formatSize(file.size);

        const removeBtn = document.createElement("button");
        removeBtn.className = "dropzone-file-remove";
        removeBtn.type = "button";
        removeBtn.setAttribute("aria-label", `Eliminar ${file.name}`);
        removeBtn.innerHTML = "&times;";
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          files.splice(index, 1);
          renderFiles();
        });

        li.appendChild(nameSpan);
        li.appendChild(sizeSpan);
        li.appendChild(removeBtn);
        fileList.appendChild(li);
      });
    }

    function formatSize(bytes) {
      if (bytes === 0) return "0 B";
      const units = ["B", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      const size = (bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0);
      return `${size} ${units[i]}`;
    }
  });
}

export default init;
