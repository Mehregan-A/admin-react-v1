export const Toast = {
    success (desc, time = 3000) {
        Alert(desc, 'success', time)
    },
    warning (desc, time = 3000) {
        Alert(desc, 'warning', time)
    },
    error (desc, time = 3000) {
        Alert(desc, 'error', time)
    },
    info (desc, time = 3000) {
        Alert(desc, 'info', time)
    },
    clear () {
        document.getElementById('alertShow').innerHTML = "";
    }
}


const Alert = (desc, type, time) => {

    let id = Date.now();

    setTimeout(function () {
        // document.getElementById('alertShow').innerHTML = "";
        document.getElementById(id).outerHTML="";
    }, time);

    let icon = ""
    let title = ""
    let color = ""
    switch (true){
        case type === "info":
            title = "توجه"
            color = "border-green-800"
            icon = `<svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" class="text-green-800" height="29" width="29" xmlns="http://www.w3.org/2000/svg">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                    </svg>`
            break;
        case type === "success":
            title = "موفق"
            color = "border-green-500"
            icon = ` <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" height="29" width="29" xmlns="http://www.w3.org/2000/svg" class="text-green-500">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                    </svg>`
            break;
        case type === "error":
            title = "خطا"
            color = "border-rose-500"
            icon = `<svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" class="text-rose-500" height="29" width="29" xmlns="http://www.w3.org/2000/svg">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"></path>
                    </svg>`
            break;
        case type === "warning":
            title = "احتیاط"
            color = "border-yellow-500"
            icon = `<svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" class="text-yellow-500" height="29" width="29" xmlns="http://www.w3.org/2000/svg">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path>
                    </svg>`
            break;

    }


    document.getElementById('alertShow').innerHTML +=
        `
        <div id="${id}"   class=" left-0 rounded-lg overflow-hidden shadow-2xl drop-shadow-xl  bg-gray-100 " role="alert">
            <div class="border-r-5 ${color} flex w-full h-full flex-row justify-center items-center item-center p-2 px-3">
                <div class="flex flex-row gap-2 w-full h-full justify-center items-center">
                   ${icon}
                    <div class="flex-col flex gap-1">
                        <span class="font-bold text-[14px] ">${title}</span>
                        <span class="text-gray-500 text-[13px] ">${desc}</span>
                    </div>
                </div>
            </div>
        </div>
        `;
}