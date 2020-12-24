using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 

public class input : MonoBehaviour
{
    public Button button;
    public InputField inputF;
    
    void Start() {
        button.onClick.AddListener(GetInput);
    }
    public void GetInput(){

        Debug.Log("s"+ inputF.text);

    }

}
