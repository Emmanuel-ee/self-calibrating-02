const buttons = document.querySelectorAll(".buttons");
const outputs = document.querySelectorAll(".output");
let index = 0
const pads = document.getElementsByClassName("pad");
const colors = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];


for (let i = 0; i < pads.length; i++) {
    pads[i].onclick = (function (index) {
        return function () {
            eliminateItems(pads[index]);
        };
    })(i);
}



let items = {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
};

function setPads() {
    for (let item in items) {
        items[item].buttons = {
            0: {}, 1: {}, 2: {},
            3: {}, 4: {}, 5: {},
            6: {}, 7: {}, 8: {},
        };
    }
}

setPads()
shuffleColor();
highlightInputArea()
setButtonColor();

let clickedPads = [0, 0, 0, 0, 0, 0, 0, 0, 0]

function eliminateItems(clickedPad) {
    const clickedPadId = clickedPad.id;
    clickedPads[clickedPadId]++

    if (clickedPads[clickedPadId] >= 2) {
        let filter = {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {},
            7: {},
            8: {},
            9: {},
        };

        function setfilter() {
            for (let i = 0; i < buttons.length; i++) {
                filter[Number(i)].buttons = {
                    0: {}, 1: {}, 2: {},
                    3: {}, 4: {}, 5: {},
                    6: {}, 7: {}, 8: {},
                };
            }
        }

        setfilter()

        for (let item of Object.keys(filter)) {
            const buttonObject = filter[item].buttons[clickedPadId];
            buttonObject.color = colors[item];
        }

        for (let item of Object.keys(items)) {
            if (items[item].buttons[clickedPadId].color !== filter[item].buttons[clickedPadId].color) {
                delete items[item]
            }
        }



    } else {
        for (let item of Object.keys(items)) {
            const buttonObject = items[item].buttons[clickedPadId];
            buttonObject.color = colors[item];
        }


    }

    if (index < outputs.length && Object.keys(items).length === 1) {
        const finalKey = Object.keys(items)[0];
        outputs[index].innerText = finalKey[0]
        index += 1
        highlightInputArea()
        let buttons = items[Object.keys(items)[0]].buttons


        items = {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {},
            7: {},
            8: {},
            9: {},
        };

        setPads()

        for (let i = 0; i < pads.length; i++) {
            if (buttons[i].color === 0) {
                pads[i].style.backgroundColor = "#ffeb3b"
                for (let item of Object.keys(items)) {
                    items[item].buttons[i].color = 0
                }

            } else if (buttons[i].color === 1) {
                pads[i].style.backgroundColor = "#b2beb5"
                for (let item of Object.keys(items)) {
                    items[item].buttons[i].color = 1
                }
            }
        }
    }

    if (index > outputs.length - 1) {
        const resetButton = document.getElementsByClassName("display-buttons")[0].innerHTML = "<button onClick = refresh()>Reset</button>"
    }
    shuffleColor();
    setButtonColor();
}





function shuffleColor() {
    for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
    }
}

function setButtonColor() {
    let i = 0;
    for (let button of buttons) {
        if (colors[i] === 0) {
            button.style.backgroundColor = "#ffeb3b";
        } else {
            button.style.backgroundColor = "#b2beb5";
        }
        i++;
    }
}



function highlightInputArea() {
    if (index < outputs.length) {
        if (index === 0) {
            outputs[index].style.border = "5px solid black"
        } else {
            outputs[index].style.border = "5px solid black"
            outputs[index - 1].style.border = ""
        }

    }

    if (index === outputs.length) {
        outputs[index - 1].style.border = ""
    }

}


function refresh() {
    window.location.reload();
}