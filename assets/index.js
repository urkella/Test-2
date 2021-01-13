let i = 0;
let budzet = 0;
let samoPrihod = 0;
let samoRashod = 0;

// Izracunaj procenat
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

// Formatiranje para
var formatirajNovac = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "RSD",
});

function dodajUnos(values, tip) {
  // Deklarisi prihod
  var budzetPrihoda = tip === "prihod";

  // Selektori
  var prihod = document.getElementById(budzetPrihoda ? "prihodi" : "rashodi");
  var budzetElement = document.getElementById("budzet");
  var samoPrihodElement = document.getElementById("samoPrihod");
  var samoRashodElement = document.getElementById("samoRashod");

  // Dodavanje element procenta
  var procenti = document.createElement("p");
  procenti.className = "rashodProcenat";
  procenti.id = "procenti";

  if (budzetPrihoda) {
    // Kalkulacija budzeta i samo prihoda
    budzet = budzet + values.iznos;
    samoPrihod = samoPrihod + values.iznos;
    samoPrihodElement.innerHTML = "+ " + formatirajNovac.format(samoPrihod);

    // Koristi querySelector jer vraca null
    // ukoliko element nije u DOM-u
    var procentiSelector = document.querySelector("#procenti");

    // Dodaj procenat
    if (procentiSelector) {
      procentiSelector.innerHTML =
        percentage(samoRashod, samoPrihod).toFixed(0) + " %";
    } else {
      procenti.innerHTML = percentage(samoRashod, samoPrihod).toFixed(0) + " %";
      samoRashodElement.append(procenti);
    }
  } else {
    // Kalkulacija budzeta i samo rashoda
    budzet = budzet - values.iznos;
    samoRashod = samoRashod + values.iznos;
    samoRashodElement.innerHTML = "- " + formatirajNovac.format(samoRashod);

    // Dodaj procenat
    procenti.innerHTML = percentage(samoRashod, samoPrihod).toFixed(0) + " %";
    samoRashodElement.append(procenti);
  }

  // Napravi element za tabelu
  var tabela = document.createElement("li");
  tabela.className = "tabela";
  tabela.id = `tabela-${values.id}`;

  // Napravi element za opis
  var opis = document.createElement("p");
  opis.innerHTML = values.opis;

  // Napravi element za iznos
  var iznos = document.createElement("p");
  var indikator = budzetPrihoda ? "+ " : "- ";
  iznos.innerHTML = indikator + formatirajNovac.format(values.iznos);

  // Dodaj rashod/prihod
  prihod.prepend(tabela);
  tabela.prepend(opis, iznos);
  budzetElement.innerHTML = formatirajNovac.format(budzet);
}

function primiUnos(ev) {
  ev.preventDefault();

  var forma = new FormData(ev.target);

  var values = {
    id: i++,
    tip: forma.get("tip"),
    opis: forma.get("opis"),
    iznos: Number(forma.get("iznos")),
  };

  dodajUnos(values, values.tip);

  // Resetovati formu
  ev.target.reset();
}
