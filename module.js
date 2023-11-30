

Hooks.once('init', function () {
    game.settings.register("HUID", "hiddeAllDetails", {

        name: "hidde details tab",
        hint: "if checked the whole details tab of unidentified items sheet will be hidden",
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
    });


})
Hooks.on("renderItemSheet", async (sheet, html, context) => {
    console.log(sheet, html, context);
    if (!sheet.object.system.identified && !game.user.isGM) {
        let desc = html.find(".item-description .accordion")[0];
        desc.style.display = "none";
        let hide = await game.settings.get("HUID", "hiddeAllDetails")
        if (hide) {
            let content = html.find("div.tab.details")[0];
            content.innerHTML = "<h2>unidentified item</h2>"
        }
        else {
            let ident = html.find("[name='system.identified']")[0];
            ident.disabled = true
        }





    }

})
Hooks.on("renderActorSheet5eCharacter", async (sheet, html, context) => {
    let unidentifiedIDS = sheet.actor.items.filter(it => !it.system.identified).map(it => it._id)

    console.log("pppppppp", unidentifiedIDS);
    let liEl = html.find("li.item[data-item-id]");
    let toHide = [];
    for (let li of liEl) {
        if (unidentifiedIDS.includes(li.dataset?.itemId)) {
            if (li.closest(".tab.inventory")) {
                li.querySelector("h4").style = "pointer-events: none";
                li.querySelector(".item-image").style = "pointer-events: none";
                li.dataset.tooltip = "unidentified"
            }

        }
    }
    console.log(toHide)
})