function val(id){
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
}

function checkedValues(selector){
    return Array.from(document.querySelectorAll(selector))
        .filter(cb => cb.checked)
        .map(cb => cb.value);
}

function row(label, value){
    return value ? `\n${label} : ${value}` : "";
}

function money(n){
    const num = Number(n);
    return isNaN(num) ? "" : `RM ${num.toLocaleString()}`;
}

/* ---------------- STEP 1: property type picker ---------------- */

function setupPropertyPicker(){
    const grid = document.getElementById("propertyGrid");
    grid.querySelectorAll(".property-card").forEach(card=>{
        card.addEventListener("click", ()=>{
            grid.querySelectorAll(".property-card").forEach(c=>c.classList.remove("active"));
            card.classList.add("active");

            document.querySelectorAll(".detail-fields").forEach(f=>f.classList.add("hidden"));
            const target = document.getElementById(`fields-${card.dataset.slug}`);
            if(target) target.classList.remove("hidden");
        });
    });
}

function setupStylePicker(){
    const grid = document.getElementById("styleGrid");
    grid.querySelectorAll(".style-card").forEach(card=>{
        card.addEventListener("click", ()=>{
            grid.querySelectorAll(".style-card").forEach(c=>c.classList.remove("active"));
            card.classList.add("active");
        });
    });
}

function getActivePropertyCard(){
    return document.querySelector("#propertyGrid .property-card.active");
}

function getActiveStyle(){
    const active = document.querySelector("#styleGrid .style-card.active");
    return active ? active.dataset.value : "Professional";
}

/* ---------------- STEP 2: conditional sub-fields ---------------- */

function setupConditionalFields(){

    // Apartment: auto price-per-sqft (unless user is actively editing that field)
    const aptPrice = document.getElementById("apt_price");
    const aptBuiltup = document.getElementById("apt_builtup");
    const aptPsf = document.getElementById("apt_pricepsf");

    function recalcPsf(){
        if(document.activeElement === aptPsf) return;
        const price = parseFloat(aptPrice.value);
        const builtup = parseFloat(aptBuiltup.value);
        if(price > 0 && builtup > 0){
            aptPsf.value = (price / builtup).toFixed(2);
        }
    }
    aptPrice.addEventListener("input", recalcPsf);
    aptBuiltup.addEventListener("input", recalcPsf);

    // Shop lot: show rental/lease fields only when tenanted
    const shopTenanted = document.getElementById("shop_tenanted");
    const shopWrap = document.getElementById("shop-tenanted-wrap");
    shopTenanted.addEventListener("change", ()=>{
        shopWrap.classList.toggle("hidden", shopTenanted.value !== "Tenanted");
    });

    // Land: show leasehold years remaining only when leasehold
    const landTenure = document.getElementById("land_tenure");
    const landLeaseWrap = document.getElementById("land-lease-years-wrap");
    landTenure.addEventListener("change", ()=>{
        landLeaseWrap.classList.toggle("hidden", landTenure.value !== "Leasehold");
    });
}

/* ---------------- Build details block per property type ---------------- */

function buildDetails(slug){

    if(slug === "apartment"){
        const facilities = checkedValues(".apt-facility").join(", ");
        return [
            row("Location", val("apt_location")),
            row("Price", money(val("apt_price"))),
            row("Price per sqft", val("apt_pricepsf") ? `RM ${val("apt_pricepsf")}` : ""),
            row("Bedrooms", val("apt_bedroom")),
            row("Bathrooms", val("apt_bathroom")),
            row("Built-up", val("apt_builtup") ? `${val("apt_builtup")} sqft` : ""),
            row("Floor / Facing", val("apt_floor")),
            row("Car Parks", val("apt_parking")),
            row("Tenure", val("apt_tenure")),
            row("Furnishing", val("apt_furnishing")),
            row("Maintenance Fee", val("apt_maintenance")),
            row("Developer", val("apt_developer")),
            row("Facilities", facilities),
            row("Nearby", val("apt_nearby")),
        ].join("");
    }

    if(slug === "landed"){
        return [
            row("Address", val("landed_project")),
            row("House Type", val("landed_housetype")),
            row("Price", money(val("landed_price"))),
            row("Bedrooms", val("landed_bedroom")),
            row("Bathrooms", val("landed_bathroom")),
            row("Land Size", val("landed_landsize")),
            row("Built-up", val("landed_builtup") ? `${val("landed_builtup")} sqft` : ""),
            row("Car Parks", val("landed_parking")),
            row("Tenure", val("landed_tenure")),
            row("Renovation", val("landed_renovation")),
            row("Facing", val("landed_facing")),
            row("Lot Type", val("landed_lottype")),
            row("Gated & Guarded", val("landed_gated")),
            row("Nearby", val("landed_nearby")),
        ].join("");
    }

    if(slug === "shoplot"){
        const tenanted = val("shop_tenanted");
        let lines = [
            row("Address", val("shop_project")),
            row("Price / Rental", val("shop_price")),
            row("Storeys", val("shop_storeys")),
            row("Built-up / Land Size", val("shop_size")),
            row("Frontage Width", val("shop_frontage")),
            row("Parking", val("shop_parking")),
            row("Tenure", val("shop_tenure")),
            row("Current Use / Zoning", val("shop_zoning")),
            row("Tenanted Status", tenanted),
        ];
        if(tenanted === "Tenanted"){
            lines.push(row("Monthly Rental Income", money(val("shop_rentalincome"))));
            lines.push(row("Lease Expiry", val("shop_leaseexpiry")));
        }
        lines.push(row("Condition", val("shop_condition")));
        lines.push(row("Location Type", val("shop_location_type")));
        lines.push(row("Nearby / Anchor Tenants", val("shop_nearby")));
        return lines.join("");
    }

    if(slug === "land"){
        const utilities = checkedValues(".land-utility").join(", ");
        const tenure = val("land_tenure");
        let lines = [
            row("Location / Lot No.", val("land_location")),
            row("Price", val("land_price")),
            row("Land Size", val("land_size") ? `${val("land_size")} ${val("land_sizeunit")}` : ""),
            row("Land Title", tenure),
        ];
        if(tenure === "Leasehold"){
            lines.push(row("Years Remaining", val("land_leaseyears")));
        }
        lines.push(row("Land Category", val("land_category")));
        lines.push(row("Topography", val("land_topography")));
        lines.push(row("Road Access", val("land_roadaccess")));
        lines.push(row("Zoning / Conversion", val("land_zoning")));
        lines.push(row("Utilities Available", utilities));
        lines.push(row("Nearby Landmarks", val("land_nearby")));
        return lines.join("");
    }

    if(slug === "factory"){
        return [
            row("Address", val("factory_project")),
            row("Price / Rental", val("factory_price")),
            row("Built-up / Land Size", val("factory_size")),
            row("Ceiling Height", val("factory_ceiling")),
            row("Floor Loading Capacity", val("factory_loading")),
            row("Loading Bay / Container Access", val("factory_loadingbay")),
            row("Power Supply", val("factory_power")),
            row("Office Space", val("factory_office")),
            row("Tenure", val("factory_tenure")),
            row("Zoning", val("factory_zoning")),
            row("Water / Effluent System", val("factory_water")),
            row("Nearby Highways / Ports", val("factory_nearby")),
        ].join("");
    }

    return "";
}

function getSpecialFeatures(slug){
    if(slug === "apartment") return val("apt_features");
    if(slug === "landed") return val("landed_features");
    return "";
}

/* ---------------- Step 4: generate ---------------- */

function generateMarketing() {

    const card = getActivePropertyCard();
    const slug = card.dataset.slug;
    const type = card.dataset.value;
    const style = getActiveStyle();

    const projectNameFieldMap = {
        apartment: "apt_project",
        landed: "landed_project",
        shoplot: "shop_project",
        land: "land_location",
        factory: "factory_project"
    };
    const name = val(projectNameFieldMap[slug]) || "this property";

    let intro = "";
    let ending = "";

    switch(style){

        case "Professional":
            intro = `🏡 FOR SALE\n\n${type} at ${name}\n\nLooking for your dream property?\n\nHere's an excellent opportunity for you.`;
            ending = `📞 Contact me today to arrange your private viewing.`;
        break;

        case "Luxury":
            intro = `✨ EXCLUSIVE LUXURY PROPERTY\n\nExperience premium living with this beautiful ${type}.`;
            ending = `Private viewing by appointment only.`;
        break;

        case "Investment":
            intro = `📈 GREAT INVESTMENT OPPORTUNITY\n\nPerfect for investors looking for long-term appreciation and rental income.`;
            ending = `Contact me now for ROI analysis and rental estimation.`;
        break;

        case "Urgent Sale":
            intro = `🔥 URGENT SALE\n\nBelow market value!\n\nDon't miss this limited opportunity.`;
            ending = `First come, first served.\nBook your viewing today!`;
        break;

        case "Friendly":
            intro = `😊 Looking for a new home?\n\nThis beautiful ${type} might be exactly what you're searching for.`;
            ending = `Feel free to PM me anytime.\nI'd be happy to assist you.`;
        break;

    }

    const details = buildDetails(slug);
    const features = getSpecialFeatures(slug);

    const output =
`${intro}
${details}
━━━━━━━━━━━━━━━━━━
${ features ? `\n✨ Special Features\n\n${features}\n\n━━━━━━━━━━━━━━━━━━\n` : "" }
${ending}
`;

    document.getElementById("generatedText").value = output;

}

function copyMarketing(){
    const text = document.getElementById("generatedText");
    if(!text.value){
        alert("Generate the copywriting first.");
        return;
    }
    text.select();
    navigator.clipboard.writeText(text.value);
    alert("✅ Copywriting copied successfully!");
}

function clearForm(){

    document.querySelectorAll("input[type=text], input[type=number], textarea").forEach(el=>{
        el.value = "";
    });

    document.querySelectorAll("select").forEach(select=>{
        select.selectedIndex = 0;
    });

    document.querySelectorAll("input[type=checkbox]").forEach(cb=>{
        cb.checked = false;
    });

    document.querySelectorAll(".property-card, .style-card").forEach(c=>c.classList.remove("active"));
    document.querySelector("#propertyGrid .property-card").classList.add("active");
    document.querySelector("#styleGrid .style-card").classList.add("active");

    document.querySelectorAll(".detail-fields").forEach(f=>f.classList.add("hidden"));
    document.getElementById("fields-apartment").classList.remove("hidden");

    document.getElementById("shop-tenanted-wrap").classList.add("hidden");
    document.getElementById("land-lease-years-wrap").classList.add("hidden");

}

setupPropertyPicker();
setupStylePicker();
setupConditionalFields();

document.getElementById("generateBtn").addEventListener("click", generateMarketing);
document.getElementById("copyBtn").addEventListener("click", copyMarketing);
document.getElementById("clearBtn").addEventListener("click", clearForm);
