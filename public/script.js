// get the list element
let phoneList = document.querySelector('ul');

// fetch the JSON of the items and parse it
fetch('/results').then(r => r.json()).then(result => {
    document.querySelector('.loading').style.display = 'none';
    // make a list item for each JSON item.
    result.forEach(item => {
        let el = document.createElement('li');

        let tag = document.createElement('h3');
        tag.innerHTML = item.tag;
        el.appendChild(tag);


        let link = document.createElement('a');
        link.innerHTML = item.title;

        tag.appendChild(link);
        el.appendChild(title);
        phoneList.appendChild(el);
    });
}).catch(e => console.error(e));
