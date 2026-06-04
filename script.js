const warpMesh = document.getElementById("warpMesh");
const weftMesh = document.getElementById("weftMesh");

const warpDia = document.getElementById("warpDia");
const weftDia = document.getElementById("weftDia");

const weaveType = document.getElementById("weaveType");

/* PLAIN AUTO SYNC */

function syncFields(source){

    if(weaveType.value !== "plain")
        return;

    if(source === "warpMesh")
        weftMesh.value = warpMesh.value;

    if(source === "weftMesh")
        warpMesh.value = weftMesh.value;

    if(source === "warpDia")
        weftDia.value = warpDia.value;

    if(source === "weftDia")
        warpDia.value = weftDia.value;
}

warpMesh.addEventListener(
    "input",
    ()=>syncFields("warpMesh")
);

weftMesh.addEventListener(
    "input",
    ()=>syncFields("weftMesh")
);

warpDia.addEventListener(
    "input",
    ()=>syncFields("warpDia")
);

weftDia.addEventListener(
    "input",
    ()=>syncFields("weftDia")
);

weaveType.addEventListener("change",()=>{

    if(weaveType.value==="plain"){

        weftMesh.value = warpMesh.value;
        weftDia.value = warpDia.value;
    }
});

function animateValue(id,value){

    document.getElementById(id)
    .innerHTML = value;
}

function calculateMesh(){

    let wm =
    parseFloat(warpMesh.value)||0;

    let wf =
    parseFloat(weftMesh.value)||0;

    let D =
    parseFloat(warpDia.value)||0;

    let d =
    parseFloat(weftDia.value)||0;

    let opening=0;
    let thickness=0;
    let weight=0;
    let constant=0;

    if(weaveType.value==="dutch"){

        let L=25.4/wm;

        opening=
        (
            D *
            (
                (L-D-d)/
                (L+D+d)
            )
        )*1000;

        thickness=
        D+d+d;

        constant=
        wf*d;

        weight=
        ((D*D*0.493*wm)/2)
        +
        ((d*d*0.493*wf)/2);

        document.getElementById(
            "dynamicTitle"
        ).innerHTML="Constant";

        document.getElementById(
            "dynamicUnit"
        ).innerHTML="";

        animateValue(
            "dynamicValue",
            Math.round(constant)
        );

    }else{

        opening=
        ((25.4/wm)-D)*1000;

        thickness=
        D*2;

        let openArea=
        Math.pow(
            (
                1-
                ((wm*D)/25.4)
            ),
            2
        )*100;

        weight=
        D*D*0.493*wm;

        document.getElementById(
            "dynamicTitle"
        ).innerHTML="Open Area";

        document.getElementById(
            "dynamicUnit"
        ).innerHTML="%";

        animateValue(
            "dynamicValue",
            Math.round(openArea)
        );
    }

    animateValue(
        "opening",
        Math.round(opening)
    );

    animateValue(
        "thickness",
        thickness.toFixed(3)
    );

    animateValue(
        "weight",
        weight.toFixed(2)
    );
}