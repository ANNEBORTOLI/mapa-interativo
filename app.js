require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer"
], function (Map, MapView, FeatureLayer) {
  // Initialize the map with a basemap
  const map = new Map({
    basemap: "streets-navigation-vector"
  });

  // Initialize the MapView and set it to the div with id "viewDiv"
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-43.2096, -22.9035], // Center on Rio de Janeiro
    zoom: 12
  });

  // Define the pop-up template
  const popupTemplate = {
    title: "Escolas (2021) - CEPERJ",
    content: `
      <b>Município:</b> {MUNICIPIO}<br>
      <b>Cód. Município:</b> {COD_MUNICIPIO}<br>
      <b>Cód. Entidade:</b> {COD_ENTIDADE}<br>
      <b>Entidade:</b> {ENTIDADE}<br>
      <b>Núm. Ano:</b> {NUM_ANO}<br>
      <b>Região:</b> {REGIAO}<br>
      <b>Cód. Região:</b> {COD_REGIAO}<br>
      <b>Mesorregião:</b> {MESORREGIAO}<br>
      <b>Cód. Mesorregião:</b> {COD_MESORREGIAO}<br>
      <b>Microrregião:</b> {MICRORREGIAO}<br>
      <b>Cód. Microrregião:</b> {COD_MICRORREGIAO}<br>
      <b>Cód. Distrito:</b> {COD_DISTRITO}<br>
      <b>Tipo de Dependência:</b> {TIPO_DEPENDENCIA}<br>
      <b>Localização:</b> {LOCALIZACAO}<br>
      <b>Endereço:</b> {ENDERECO}, {NUMERO}<br>
      <b>Complemento:</b> {COMPLEMENTO}<br>
      <b>Bairro:</b> {BAIRRO}<br>
      <b>Cód. CEP:</b> {COD_CEP}<br>
      <b>DDD:</b> {DDD}<br>
      <b>Telefone:</b> {TELEFONE}
    `
  };

  // Add the FeatureLayer using the external URL
  const featureLayer = new FeatureLayer({
    url: "https://gis-portal.westeurope.cloudapp.azure.com/server/rest/services/00_PUBLICACOES/edu_escolas_ceperj_2021/FeatureServer/0",
    outFields: ["*"], // Retrieve all fields from the service
    popupTemplate: popupTemplate // Attach the pop-up template to the layer
  });

  // Add the FeatureLayer to the map
  map.add(featureLayer);

  // Event listener for filtering schools based on type
  document.getElementById("municipal").addEventListener("change", function () {
    featureLayer.definitionExpression = "TIPO_DEPENDENCIA = 'Municipal'";
  });

  document.getElementById("private").addEventListener("change", function () {
    featureLayer.definitionExpression = "TIPO_DEPENDENCIA = 'Privada'";
  });

  document.getElementById("all").addEventListener("change", function () {
    featureLayer.definitionExpression = null; // Show all schools
  });
});
