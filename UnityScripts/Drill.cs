using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Drill : MonoBehaviour
{
    public Camera mainC;
    Vector3 next_destination;
    Vector3 vertical;
    Vector3 horizontal;
    public float speed=1f;
    float drill_level;
    public float dig_level;
    public string log;
    public string dig;
    
    public int ClickCounter;

    GameObject logUI;
    public GameObject inputText;

    // Start is called before the first frame update
    void Start()
    {
        
        if(this.transform.parent.gameObject.name=="Ship1"){
            ClickCounter=1;
        }
        else{
            ClickCounter=0;
        }

        inputText=this.transform.parent.GetChild(0).GetChild(1).gameObject;
        logUI=this.transform.parent.GetChild(0).GetChild(0).gameObject;


        //next_destination=transform.position;
        drill_level=transform.position.y;
        dig_level=drill_level;


    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0)){ 
         
         Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
         RaycastHit hit;


            if (Physics.Raycast(ray,out hit,500)){
                ClickCounter++;  
                if(ClickCounter%2==0){
                   // inputText. .ActivateInputField();
                }
                 if(ClickCounter%2==1){
                    //inputText.DeactivateInputField();
                }
            }
        }
       

        if(Vector3.Distance(transform.position,next_destination)<1f){

            log=transform.position.ToString()+": "+dig+'\n';
            logUI.GetComponent<UnityEngine.UI.Text>().text=log;


        }  

        Dig(dig_level);
    
    
    
    
    
    
    
    }

    public void Dig(float DigLevel){
        if(transform.position.y<dig_level)
        {
            transform.position += new Vector3(0.0f, speed * Time.deltaTime,0.0f);
        }
        
    }
    
    void Retrieve(){
       
    }


    void OnTriggerStay(Collider other) {
        
        dig=other.gameObject.GetComponent<UnityEngine.UI.Text>().text;
        
    }

}
