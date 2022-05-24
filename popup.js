const btn = document.querySelector(".changeColorPicker")
const colorGrid = document.querySelector(".colorGrid")
const colorValue = document.querySelector(".colorValue")

btn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    }, async (injectionResults) => {
        const [{ result }] = injectionResults
        if (result) {
            const color = result.sRGBHex
            colorGrid.style.backgroundColor = color
            try {
                await navigator.clipboard.writeText(color)
            } catch (err) {
                console.log(err)
            }
            colorValue.innerText = color
        }
    })
})

async function pickColor() {
    try {
        const eyeDropper = new EyeDropper()
        return await eyeDropper.open()

    } catch (err) {
        console.log(err)
    }
}