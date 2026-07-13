function generateMarketing() {

    const type = document.getElementById("propertyType").value;
    const name = document.getElementById("propertyName").value;
    const location = document.getElementById("location").value;
    const price = document.getElementById("price").value;
    const bedroom = document.getElementById("bedroom").value;
    const bathroom = document.getElementById("bathroom").value;
    const parking = document.getElementById("parking").value;
    const buildup = document.getElementById("buildup").value;
    const landsize = document.getElementById("landsize").value;
    const tenure = document.getElementById("tenure").value;
    const nearby = document.getElementById("nearby").value;
    const features = document.getElementById("features").value;
    const style = document.getElementById("style").value;

    let intro = "";
    let ending = "";

    switch(style){

        case "Professional":

            intro =
`🏡 FOR SALE

${type} at ${name}

Looking for your dream property?

Here's an excellent opportunity for you.`;

            ending =
`📞 Contact me today to arrange your private viewing.`;

        break;


        case "Luxury":

            intro =
`✨ EXCLUSIVE LUXURY PROPERTY

Experience premium living with this beautiful ${type}.`;

            ending =
`Private viewing by appointment only.`;

        break;


        case "Investment":

            intro =
`📈 GREAT INVESTMENT OPPORTUNITY

Perfect for investors looking for long-term appreciation and rental income.`;

            ending =
`Contact me now for ROI analysis and rental estimation.`;

        break;


        case "Urgent Sale":

            intro =
`🔥 URGENT SALE

Below market value!

Don't miss this limited opportunity.`;

            ending =
`First come, first served.
Book your viewing today!`;

        break;


        case "Friendly":

            intro =
`😊 Looking for a new home?

This beautiful ${type} might be exactly what you're searching for.`;

            ending =
`Feel free to PM me anytime.
I'd be happy to assist you.`;

        break;

    }

    const output =

`${intro}

📍 Location : ${location}

💰 Price : RM ${Number(price).toLocaleString()}

🛏 Bedrooms : ${bedroom}

🚿 Bathrooms : ${bathroom}

🚗 Parking : ${parking}

📐 Built Up : ${buildup}

🌳 Land Size : ${landsize}

📜 Tenure : ${tenure}

━━━━━━━━━━━━━━━━━━

⭐ Nearby

${nearby}

━━━━━━━━━━━━━━━━━━

✨ Special Features

${features}

━━━━━━━━━━━━━━━━━━

${ending}
`;

    document.getElementById("generatedText").value = output;

}



function copyMarketing(){

    const text =
    document.getElementById("generatedText");

    text.select();

    navigator.clipboard.writeText(text.value);

    alert("✅ Copywriting copied successfully!");

}



function clearForm(){

    document.querySelectorAll("input").forEach(input=>{

        input.value="";

    });

    document.querySelectorAll("textarea").forEach(area=>{

        area.value="";

    });

    document.querySelectorAll("select").forEach(select=>{

        select.selectedIndex=0;

    });

}
