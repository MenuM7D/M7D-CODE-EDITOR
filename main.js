// إعداد المحرر
const editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
    lineNumbers: true,
    mode: "javascript",
    theme: "material-darker",
    matchBrackets: true,
    autoCloseBrackets: true,
});

// وظائف الأزرار
document.getElementById("clearButton").addEventListener("click", () => {
    editor.setValue("");
});

document.getElementById("autoCompleteButton").addEventListener("click", () => {
    editor.showHint({ completeSingle: false });
});

document.getElementById("copyButton").addEventListener("click", async () => {
    const code = editor.getValue();
    try {
        await navigator.clipboard.writeText(code);
        alert("تم نسخ الكود بنجاح من المحرر الي حافظتك");
    } catch (error) {
        alert("حدث خطأ اثناء النسخ");
    }
});

document.getElementById("pasteButton").addEventListener("click", async () => {
    try {
        const text = await navigator.clipboard.readText();
        editor.setValue(text);
        alert("تم لصق الكود بنجاح من حافظتك الي المحرر");
    } catch (error) {
        alert("حدث خطأ اثناء الصق");
    }
});

// وظيفة التشفير
document.getElementById("encryptButton").addEventListener("click", () => {
    const code = editor.getValue();
    if (!code) {
        alert("لا يوجد اي كود موجود في المحرر لأقوم بتشفيره");
        return;
    }

    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
    }).getObfuscatedCode();

    editor.setValue(obfuscatedCode);
    alert("تم تشفير كود جافا الخاص بك بنجاح");
});

// نافذة الترحيب المنبثقة
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const privacyButton = document.getElementById("privacyButton");

privacyButton.addEventListener("click", () => {
    popup.style.display = "block";
});

closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});
