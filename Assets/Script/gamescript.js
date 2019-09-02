#pragma strict
var btnQuit:GameObject;
var btnRetry:GameObject;

function Start () {

}

function Update () {

}

function quit(){
    Application.Quit ();
}


function restart(){
    Application.LoadLevel ("game");
}