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
      if (contentEntry.type === 'directory') {
        directory.appendChild(createDirectory(contentEntry));
      } else if (contentEntry.type === 'file') {
        directory.appendChild(createBook(contentEntry));
      }
    })

    return directory;
  }

  const createBook = (entry) => {
    const bookEntry = document.createElement("p");
    bookEntry.appendChild(document.createTextNode(entry.name))

    return bookEntry;
  }

  const response = await loadData();
  const dataJson = JSON.parse(response);

  const itensContainer = document.querySelector(".itens-container")

  dataJson.forEach(entry => {
    if (entry.type === 'directory') {
      itensContainer.appendChild(createDirectory(entry));
    } else if (entry.type === 'file') {
      createBook(entry);
    }
    // const itemHeader = document.createElement("header");
    // itemHeader.appendChild(document.createTextNode(entry.title))

    // const detailsSection = document.createElement("section");

    // entry.pictures.forEach(picture => {
    //   const itemPicture = document.createElement("img");
    //   itemPicture.src = picture;
    //   itemPicture.addEventListener("click", function(e) {
    //     itemPicture.classList.toggle("zoomed");
    //     e.stopPropagation();
    //   })
    //   detailsSection.appendChild(itemPicture);
    // })


    // const textDetails = document.createElement("div");

    // const itemDescription = document.createElement("summary");
    // itemDescription.appendChild(document.createTextNode(entry.description))
    // textDetails.appendChild(itemDescription);

    // if (entry.availability) {
    //   const availabilityItem = document.createElement("summary");
    //   availabilityItem.classList.add("availability");
    //   availabilityItem.appendChild(document.createTextNode(entry.availability))
    //   textDetails.appendChild(availabilityItem);
    // }

    // const itemPrice = document.createElement("footer");
    // itemPrice.appendChild(document.createTextNode(entry.price))
    // textDetails.appendChild(itemPrice);

    // detailsSection.appendChild(textDetails);

    // const itemSection = document.createElement("article");
    // itemSection.appendChild(itemHeader)
    // itemSection.appendChild(detailsSection)

    // itensContainer.appendChild(itemSection);
  });
})();