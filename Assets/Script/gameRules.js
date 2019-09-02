#pragma strict

var minTranslation = 0.05;
var scoreboard = 0; //Pointage en chiffres.
var preTextScore = "SCORE: "; //Texte permanent.
var scoreTx = "0"; //Pointage en lettres.
var pointsPerBounce = 35; //Valeur d'un bond.
var scoreGUI:UI.Text; //Champ de texte
var smoke:ParticleSystem;
var gameOver = false;
var btnQuit:GameObject;
var btnRetry:GameObject;
private var overOnce = false;


function Start () {
    gameOver = false;
    btnQuit.SetActive(false);
    btnRetry.SetActive(false);
}


function Update () {

}


function quit(){
    Application.Quit ();
}


function restart(){
    Application.LoadLevel ("game");
}


function increaseDiff(){
    var timeScaleLimit:float = 3;
    var timeScaler:float = Time.timeScale + 0.03;
    if (timeScaler > timeScaleLimit)
        timeScaler = timeScaleLimit;
    Time.timeScale = timeScaler;
}


function addScore(){
    scoreboard += pointsPerBounce;
    scoreTx = scoreboard.ToString();
    increaseDiff();
}


function OnGUI(){
    scoreGUI.text = preTextScore + scoreTx;

    if (gameOver && !overOnce){
        overOnce = true;
        btnQuit.gameObject.SetActive(true);
        btnRetry.gameObject.SetActive(true);
    }

}


function OnCollisionEnter(collision : Collision) {

    var colPos = collision.transform.position ;
    var rigid = GetComponent.<Rigidbody>();
    var audioPaddle = GetComponent.<AudioSource>();
    var audioSmoke = smoke.GetComponent.<AudioSource>();

    if (collision.collider.tag == "paddle"){
        audioPaddle.Play();
        var diffX = minTranslation + (colPos.x - transform.position.x)*Random.Range(1,10);
        var diffZ = minTranslation + (colPos.z - transform.position.z)*Random.Range(1,10);
        rigid.velocity = Vector3(-diffX, 8, -diffZ);
        addScore();
    }
    else{
        //GameOver
        smoke.transform.position = transform.position;
        transform.position = Vector3(-100,-100,-100);
        Time.timeScale = 1.0;
        smoke.Play();
        audioSmoke.Play();
        gameOver = true;
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
    }

}