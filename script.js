document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion");
    const totalPriceElement = document.getElementById("totalPrice");
    let selectedOptions = {}; // Store selected options for each service
    let customValues = {}; // Store custom values for each service

    accordions.forEach((accordion) => {
        accordion.addEventListener("click", function () {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });

        const options = accordion.nextElementSibling.querySelectorAll("input[type='radio']");
        options.forEach((option) => {
            option.addEventListener("change", function () {
                const serviceName = this.name;
                const price = parseFloat(this.value);
                selectedOptions[serviceName] = price; // Update selected option
                updateTotalPrice();
            });
        });
    });

    // Helper function to add custom value handlers
    function addCustomValueHandler(serviceName, inputId, buttonId) {
        const customValueInput = document.getElementById(inputId);
        const addCustomValueButton = document.getElementById(buttonId);
        if (customValueInput && addCustomValueButton) {
            addCustomValueButton.addEventListener("click", function () {
                const value = parseFloat(customValueInput.value) || 0;
                customValues[serviceName] = value;
                updateTotalPrice();
            });
        } else {
            console.error(`Elements not found for ${serviceName}: ${inputId}, ${buttonId}`);
        }
    }

    // Adding custom value handlers
    addCustomValueHandler("netflix", "customValueNetflix", "addCustomValueButtonNetflix");
    addCustomValueHandler("hbo-max", "customValueHBO", "addCustomValueButtonHBO");
    addCustomValueHandler("disney", "customValueDisney", "addCustomValueButtonDisney");
    addCustomValueHandler("amazon", "customValueAmazon", "addCustomValueButtonAmazon");
    addCustomValueHandler("globo", "customValueGlobo", "addCustomValueButtonGlobo");
    addCustomValueHandler("paramount", "customValuePara", "addCustomValueButtonPara");
    addCustomValueHandler("apple", "customValueApple", "addCustomValueButtonApple");
    addCustomValueHandler("spotify", "customValueSpotify", "addCustomValueButtonSpotify");
    addCustomValueHandler("youtube", "customValueYoutube", "addCustomValueButtonYoutube");

    // Reset button handling
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", function () {
        selectedOptions = {};
        customValues = {};
        document.querySelectorAll("input[type='radio']").forEach((radio) => {
            radio.checked = false;
        });
        document.querySelectorAll("input[type='number']").forEach((input) => {
            input.value = '';
        });
        updateTotalPrice();
    });

    function updateTotalPrice() {
        const total = Object.values(selectedOptions).reduce((sum, val) => sum + val, 0) +
                      Object.values(customValues).reduce((sum, val) => sum + val, 0);
        totalPriceElement.textContent = `R$${total.toFixed(2).replace('.', ',')}`;
    }
});
