const modal = document.getElementById("customModal");
const span = document.getElementById("closeModal");

function showModal(message) {
    document.getElementById("modalMessage").textContent = message;
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

export { showModal };
