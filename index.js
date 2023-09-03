const loadCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();

  const tabContainer = document.getElementById("tab-container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `<Button onClick='displayContent(${category.category_id})' class="btn">${category.category}</Button>`;
    tabContainer.appendChild(div);
  });
};

const sortByView = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/1000`
  );
  data = await response.json();
  const sortByView = document.getElementById("sort-btn");
  const viewData = data.data.sort(
    (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
  );
  nameShowContainer(viewData);
};

const displayContent = async (category_id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${category_id}`
  );
  data = await response.json();
  nameShowContainer(data.data);
};

const nameShowContainer = (showData) => {
  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";
  const pngVerifyTick = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="fi_10629607" clip-path="url(#clip0_11_245)">
<g id="Group">
<path id="Vector" d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
<path id="Vector_2" d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92668C6.88909 8.52512 6.23752 8.52512 5.83596 8.92668C5.4344 9.32824 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
</g>
</g>
<defs>
<clipPath id="clip0_11_245">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>`;

  if (showData.length === 0) {
    cardContainer.innerHTML = `<div class="flex justify-center"><div class=" ">
    <figure><img class="item-center justify-center" src="icon.png"></figure></div> 
    <div> <p>content not available</p></div>
    </div>`;
  } else {
    data.data.forEach((content) => {
      const div = document.createElement("div");

      const convertedHours = Math.floor(content.others.posted_date / 3600);
      const convertedMinutes = Math.floor(
        (content.others.posted_date % 3600) / 60
      );

      let time;
      if (convertedHours != 0) {
        time = `<p class="text-white">${convertedHours} hours ${convertedMinutes} minute ago</p>`;
      } else {
        time = "";
      }

      div.innerHTML = `<div class="grid gap-6 grid-cols-1
        md:grid-cols-2 lg:grid-cols-4 card-container" id="card-container">
        <div class="card h-72">
        <figure><img src="${content.thumbnail}" alt="" /></figure>
    <div class="text-end -mt-6"><span class="">
    ${time}</span></div>
        <div class="card-body justify-center items-center text-left">
      <div class="avatar text-left">
      <div class ="w-10 rounded-full -ml-6">
      <img src="${content.authors[0].profile_picture}" alt="" />
      </div>
      <h2 class=" card-title ">${content.title}</p>
      </div>
      <div class="flex">
      <span>${content.authors[0].profile_name}</span>
       ${content.authors[0].verified ? pngVerifyTick : ""} 
      </div>
      <p class="text_center">${content.others.views}</p>

     </div>
     </div>`;

      cardContainer.appendChild(div);
    });
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/1000`
  );

  data = await response.json();
  loadCategory();
  nameShowContainer(data.data);
});
