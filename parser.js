function loadXMLDoc(url){
  if(window.XMLHttpRequest)
  {
    //for IE7+, Firefox,Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  }
  else
  {
    //for IE5, IE6
    xmlhttp = nwe ActiveXObject();
    //ActiveXObject will be loaded only for IEs
  }
  if(this.readyState == 4 && this.status == 200)
  {
    format2Table(this);
  }
  xmlhttp.open("GET", url, false);
  xmlhttp.send();


}
