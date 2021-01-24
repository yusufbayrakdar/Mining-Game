using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Ship : MonoBehaviour
{      Vector3 next_destination;
    Vector3 vertical;
    Vector3 horizontal;
    public float speed=1f;
    float ship_level;
    public string log;
    string dig;
    
    public int ClickCounter;

    GameObject Drill;

    GameObject logUI;
    public GameObject inputText;
    //public float DigLevel;

    // Start is called before the first frame update
    void Start()


    {   
        //DigLevel=-4;
        Drill=this.transform.GetChild(1).gameObject;

        if(this.gameObject.name=="Ship1"){
            ClickCounter=1;
        }
        else{
            ClickCounter=0;
        }
        next_destination=transform.position;
        ship_level=transform.position.y;



        logUI=this.gameObject.transform.GetChild(0).GetChild(0).gameObject;
        
        inputText=this.gameObject.transform.GetChild(0).GetChild(1).gameObject;

        
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
                next_destination=hit.collider.transform.position;
                next_destination.y=ship_level;
                }
            }
        }
       
        verticalMovement();
        horizontalMovement();

        if(Vector3.Distance(transform.position,next_destination)<1f){

            log=transform.position.ToString()+": "+dig+'\n';
            logUI.GetComponent<UnityEngine.UI.Text>().text=log;

           // Drill.GetComponent<Drill>().Dig(DigLevel);
        }  
    
    
    
    
    }



void verticalMovement(){
    vertical=new Vector3(transform.position.x,ship_level,next_destination.z);
    transform.position = Vector3.Lerp(transform.position, vertical, speed * Time.deltaTime);
    
}
void horizontalMovement(){
        horizontal=new Vector3(next_destination.x,ship_level,transform.position.z);
        transform.position = Vector3.Lerp(transform.position, horizontal, speed * Time.deltaTime);

        
}
void OnTriggerStay(Collider other) {
    dig=other.gameObject.GetComponent<UnityEngine.UI.Text>().text;
    
}

        
}