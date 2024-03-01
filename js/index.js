
let  rundoce = 1001;

const videoLoading = async() => {
    const catagory = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const {data} = await catagory.json();
    catagoryButton(data)
}

const catagoryButton = (data)=>{
    const btnContainer = document.getElementById("btn-container");
    data.forEach(items => {
        let btnCr = document.createElement("button");
        btnCr.className = "btn mx-[10px] cat-btn"
        btnCr.innerText = items.category
        btnCr.addEventListener("click", ()=> {
            let btnFind = document.querySelectorAll(".cat-btn");
            for(const btns of btnFind){
                btns.classList.remove("btn-error");
            }
            btnCr.classList.add("btn-error");
            dataFindHandel(items.category_id);
        })
        btnContainer.appendChild(btnCr)
    });
}

const dataFindHandel = async(id)=>{
    const tubeData = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const {data} = await tubeData.json();
    displayData(data)

}

const displayData = (data)=>{
        const erroContainer = document.getElementById("error-Container");
        if(data.length > 0){
            erroContainer.classList.add("hidden");
        }else{
            erroContainer.classList.remove("hidden");
        }
        const tubeContainer = document.getElementById("tube-container");
        tubeContainer.innerHTML = ''
        data.forEach((items)=>{
            const hours = Math.floor(items?.others?.posted_date / (1000 * 60 * 60));
            const minutes = Math.floor((items?.others?.posted_date % (1000 * 60 * 60)) / (1000 * 60));

            let time = `${hours}hrs ${minutes} min ago`
            
            console.log(items)
            const div = document.createElement("div");
        div.innerHTML = `
                            <div class="card">
                                <div class="image relative">
                                    <img class="w-full h-[200px] object-cover rounded-lg" src="${items.thumbnail}" alt="">
                                    <span class="absolute bottom-2 right-2 py-[5px] px-[12px] bg-gray-200 rounded-lg text-[12px]"> ${time} </span>
                                </div>
                                <div class="body-card flex gap-[10px]  mt-[30px]">
                                    <div class="img-part">
                                        <img class="w-[40px] h-[40px] rounded-full object-cover" src="${items?.authors[0]?.profile_picture}" alt="">
                                    </div>
                                    <div class="content">
                                        <h4 class="text-[16px] font-[700]">${items.title}</h4>
                                        <div class="flex gap-[10px] my-[9px] items-center">
                                            <span class="authorName text-[#171717B3] text-[14px]">${items?.authors[0]?.profile_name}</span>
                                            <img src="${items?.authors[0]?.verified ? './image/Group.png' : ''}" alt="">
                                        </div>
                                        <span class="text-[#171717B3] text-[14px]">${items?.others?.views} views</span>
                                    </div>
                                </div>
                            </div> `
                        tubeContainer.appendChild(div)
    })
}
videoLoading();
dataFindHandel(rundoce);
// https://openapi.programming-hero.com/api/videos/category/${id}