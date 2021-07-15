const studentsList = document.querySelector('#students_list')
//create li and render student names
function renderStud(doc) {

    let li = document.createElement('li');
    li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center secondary-light mode")
    let name = document.createElement('span')
    let div = document.createElement('div');
    div.setAttribute("class", "badge rounded-pill");
    let alert = document.createElement('a');
    alert.setAttribute("class", "btn btn-warning rounded-pill mx-1 px-3 reduced-fs");
    alert.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
        console.log(id)
        db.collection('student').doc(id).get().then((doc) => {
            if (doc.data().isspoof == true) {
                db.collection('student').doc(id).update({
                    isspoof: false
                })
            } else {
                db.collection('student').doc(id).update({
                    isspoof: true
                })
            }
        });
    })
    let smallAlert = document.createElement("div");
    smallAlert.innerHTML = "Change "
    alert.appendChild(smallAlert);
    div.appendChild(alert);
    $(li).attr({
        'data-id': doc.id,
    })
    name.textContent = doc.data().username;
    name.textContent = name.textContent.charAt(0).toUpperCase() + name.textContent.slice(1);
    li.appendChild(name);

    badge = document.createElement('span');
    if (doc.data().isspoof) {
        badge.setAttribute('class', 'badge rounded-pill bg-danger mx-3');
        badge.innerHTML = "Suspected";
        name.appendChild(badge);
    } else {
        badge.setAttribute('class', 'badge rounded-pill bg-success mx-3');
        badge.innerHTML = "No issues";
        name.appendChild(badge);
    }
    li.appendChild(div);
    studentsList.appendChild(li)

}
{/* <div class="badge rounded-pill">
            <a class="btn btn-warning rounded-pill mx-1 px-3 reduced-fs" href="#"> <small><i
                        class="bi bi-exclamation-triangle"></i> Alert</small> </a>
            <a href="#" class="rounded-pill btn btn-light reduced-fs px-3"> <small><i
                        class="bi bi-megaphone"></i></small> </a>
        </div> */}
db.collection("student").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderStud(change.doc)
        } else if (change.type == 'modified') {
            let li = studentsList.querySelector('[data-id=' + change.doc.id + ']');
            li.children[0].innerHTML = change.doc.data().username
            badge = document.createElement('span');
            if (change.doc.data().isspoof) {
                badge.setAttribute('class', 'badge rounded-pill bg-danger mx-3');
                badge.innerHTML = "Suspected";
                li.children[0].appendChild(badge);
            } else {
                badge.setAttribute('class', 'badge rounded-pill bg-success mx-3');
                badge.innerHTML = "No issues";
                li.children[0].appendChild(badge);
    }
    //li.appendChild(div);
        } else if (change.type == 'removed') {
            let li = studentsList.querySelector('[data-id=' + change.doc.id + ']');
            li.remove();
        }
    })
})
