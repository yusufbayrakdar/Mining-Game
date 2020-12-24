using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class tile : MonoBehaviour
{
    public GameObject surface;
    public GameObject crust;
    public GameObject newCube;

    public Vector3 core;
    public int gridSize;
    
    // Start is called before the first frame update
    void Start()
    {
        gridSize=9;
        core=new Vector3(Random.Range(-40.0f, 40.0f),Random.Range(-80.0f, -10.0f),Random.Range(-40.0f, 40.0f));


        for (int i = (-gridSize)/2; i < gridSize/2; i++){
                for (int j = (-gridSize)/2; j < gridSize/2; j++) {
                    for (int k = 1; k <=gridSize; k++) {
                    float value;
                    newCube=Instantiate(crust, new Vector3(i * 10.0F, k*(-10.0F), j*10.0F), Quaternion.identity);
                    value=Vector3.Distance(newCube.transform.position,core);
                    value=200000/(value*value);


                    newCube.GetComponent<UnityEngine.UI.Text>().text=value.ToString();

                    newCube.transform.SetParent(this.transform);
                    }   
                }
        }    

        for (int i = (-gridSize)/2; i < gridSize/2; i++)    {
            for (int j = (-gridSize)/2; j < gridSize/2; j++)
            {
                newCube=Instantiate(surface, new Vector3(i * 10.0F, 0, j*10.0F), Quaternion.identity);
                newCube.transform.SetParent(this.transform);
            }
        }

          
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
