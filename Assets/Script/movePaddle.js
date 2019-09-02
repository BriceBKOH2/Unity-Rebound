#pragma strict

var speed = 3.0;


function Start () {
    Cursor.lockState = CursorLockMode.Locked;
    Cursor.visible = false;
}


function Update () {
    
    if (Input.GetKey(KeyCode.Space)){
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
    }

    var trans_Y : float = Input.GetAxis ("Mouse Y") * speed;
    var trans_X : float = Input.GetAxis ("Mouse X") * speed;
    trans_Y = trans_Y * (Time.deltaTime/Time.timeScale);
    trans_X = trans_X * (Time.deltaTime/Time.timeScale);
    transform.Translate (trans_X, 0, trans_Y);
}