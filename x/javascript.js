// Open color box
const box = document.getElementById('open_box'),
      Open = document.getElementById('open_btn')

Open.addEventListener("click" , () => {
    box.classList.toggle("active");
})

// Change Color
let buttons = document.querySelectorAll(".btn");
buttons.forEach(x => {
    x.addEventListener("click", (e) => {
        let target = e.target;
        let y = x.getAttribute("data-color");
        document.querySelector(":root").style.setProperty("--white", y);
        document.querySelector(":root").style.setProperty("--black", y);
        document.querySelector(":root").style.setProperty("--white", y);
        document.querySelector(":root").style.setProperty("--blue", y);
        document.querySelector(":root").style.setProperty("--light", y);

        document.querySelector(".cycle").classList.remove("cycle")
        target.classList.add("cycle");
    });
});

// Open & Close Modal
const showModal = (open, setOpen) => {
    const OpenButton = document.getElementById(open),
    modalContainer = document.getElementById(setOpen)

    if(open && modalContainer) {
        OpenButton.addEventListener('click', () => {
            modalContainer.classList.add('show-modal')
        })
    }
}

showModal('open_modal','modal-container')

const closeModal = document.querySelectorAll('.close-modal')

function closeBtn() {
    const modalContainer = document.getElementById('modal-container')
    modalContainer.classList.remove('show-modal')
}

closeModal.forEach(x => x.addEventListener('click', closeBtn))

const select =  document.querySelector('.select_btn');
const input = document.querySelector('#file');
const imga = document.querySelector('.img_area');
const deleteImg = document.querySelector('.delete-img');

select.addEventListener('click', function(){
    input.click();
})
// Upload Image
input.addEventListener('change', function(){
    const image = this.files[0];
    if(image.size < 2000000) {
    const reader = new FileReader();
    reader.onload = () => {
        const all = imga.querySelectorAll('img');
        all.forEach(x => x.remove());
        const imgUrl = reader.result;
        const img = document.createElement('img');
        img.src = imgUrl;
        imga.appendChild(img);
        imga.classList.add('img_active');
        imga.dataset.img = image.name; 
        deleteImg.addEventListener('click', function() {
           img.remove();
        });
    }
    reader.readAsDataURL(image);
    } else {
        alert("Image size more than 2MB");
    }
});
// Fetch Data from API and Search Box
const getContainer = document.getElementById('x');
const SearchBar = document.getElementById('search');

let h = [];
SearchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredInfo = h.filter(character => {
       return character.title.toLowerCase().includes(searchString);
    });
    displayInfo(filteredInfo);
});

const loadInfo = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        h = await res.json();
        displayInfo(h);
    } catch (err) {
        console.error(err);
    }
};

const displayInfo = (characters) => {
    const htmlString = characters.map((character) => {
        return `
        <tr>
            <td>${character.title}</td>
            <td>${character.category}</td>
            <td>${character.description}</td>
        </tr>
        `;
    })
    .join('');
    getContainer.innerHTML = htmlString;
};

loadInfo();

// Rate function
const stars = document.querySelectorAll('.stars i');
stars.forEach((star, x) => {
    star.addEventListener('click', () => {
        stars.forEach((star, y) => {
            x >= y ? star.classList.add('show_star') : star.classList.remove('show_star');
        })
    })
})

// Random icon
const random = document.querySelector('#random');
const arr = ['✒️','📅','📂','📌','📝','✏️','📖','📒','📜','🖋️','✂️'];
random.addEventListener('click', () => {
    random.innerHTML = arr[Math.floor(Math.random() * arr.length)];
});

// ScrollReveal effect
ScrollReveal ({
    reset: true,
    distance: '40px',
    duration: 2500,
    delay: 400
});

ScrollReveal().reveal('.section_title', {delay: 300, origin: "letf"});
ScrollReveal().reveal('.search', {delay: 300, origin: "right"});
ScrollReveal().reveal('.table__x', {delay: 400, origin: "bottom"});
ScrollReveal().reveal('.stars', {delay: 600, origin: "right"});
ScrollReveal().reveal('.refresh__options', {delay: 600, origin: "left"});
ScrollReveal().reveal('.modal_button', {delay: 600, origin: "top", scale: .85});