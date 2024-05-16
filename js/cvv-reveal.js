const openEye = document.querySelector("#show-password");

openEye.addEventListener("click", ()=>{
    let cvvValue = document.getElementById("cvv");
    if(cvvValue.type === "password"){
        cvvValue.type="text";
        openEye.classList.add("fa-eye-slash")
        openEye.classList.remove("fa-eye")
    }else{
        cvvValue.type="password";
        openEye.classList.remove("fa-eye-slash")
        openEye.classList.add("fa-eye")
    }
})
