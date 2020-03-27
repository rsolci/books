(async function() {
  function loadData() {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType("application/json");
      xhr.open("GET", "livros.json?"+ new Date().getTime(), true);
      xhr.onload = function() {
        resolve(xhr.responseText)
      }
      xhr.onerror = function(e) {
        reject(e)
      }
      xhr.send();
    });
  }

  const createDirectory = (entry) => {
    const directory = document.createElement("details");

    const directorySummary = document.createElement("summary");
    directorySummary.appendChild(document.createTextNode(entry.name))
    directory.appendChild(directorySummary)

    if (!entry.contents) {
      return directory;
    }

    entry.contents.forEach(contentEntry => {
      createEntry(directory, contentEntry)
    })

    return directory;
  }

  const createBook = (entry) => {
    const bookEntry = document.createElement("p");
    bookEntry.classList.add('book-entry')
    bookEntry.appendChild(document.createTextNode(`📖 ${entry.name}`))

    return bookEntry;
  }

  const response = await loadData();
  const dataJson = JSON.parse(response);

  const itensContainer = document.querySelector(".itens-container")

  function createEntry(parent, entry) {
    if (entry.type === 'directory') {
      parent.appendChild(createDirectory(entry));
    } else if (entry.type === 'file') {
      parent.appendChild(createBook(entry));
    }
  }

  dataJson.forEach(entry => {
    createEntry(itensContainer, entry)
  });
})();