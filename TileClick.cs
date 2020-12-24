using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TileClick : MonoBehaviour
{
    MeshRenderer meshr;
    Collider coll;
    // Start is called before the first frame update
    void Start()
    {
      meshr=GetComponent<MeshRenderer>();
      coll=GetComponent<BoxCollider>();
    }

    // Update is called once per frame
    void Update()
    {
     if (Input.GetMouseButtonDown(0)){ 
         Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
         RaycastHit hit;

            if (Physics.Raycast(ray,out hit,500)){
                if(hit.collider==coll){              
                    //print(GetComponent<UnityEngine.UI.Text>().text);
                    meshr.enabled=!meshr.enabled;
            }
            }
        }
       
    }
     void OnTriggerEnter(Collider other) {
         
             meshr.enabled=false;
         

     }


}
