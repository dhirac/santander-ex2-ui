
import React, { Component } from 'react';

import { Form,Button,Container,Row,Col,Card,ListGroup,ListGroupItem} from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PieChart } from 'react-minimal-pie-chart';

import emoji from './assets/emotion.jpg';
import epositive from './assets/positive.jpg';
import enegative from './assets/negative.jpg';
import eneutral from './assets/neutral.jpg';


export default class App extends Component {


    constructor(props){
        super(props);
       
 
        this.state = {
         
            search:true,
            showProgress:false,
            progress:0,
            hashtag:'',
            tweetsCount:'',
            showAvatar:false,
            positive:'',
            negative:'',
            neutral:'',
            polarity:'',
            showPie:false,
            tweet:true
          
        };


       
       }

      
       refresh = () => {

        alert();

       }


    search = () => {
       

      if(this.state.hashtag == "")
      {
        alert("Please enter your tweets for search");
      }
      else if(this.state.tweetsCount == "")
      {
        alert("Please enter tweets count to take a sample for");
      }
      else{

        if(this.isNumeric(this.state.tweetsCount) == true){
        this.setState({showProgress:true})
        this.setState({search:false})
        this.setState({showArtist:true})
        this.setState({progress:100})


        this.analyse();


        }else{
          alert("Please Enter Only Number in Tweets count");
        }



      }
    

    }


    isNumeric(number) {
      if (+number === +number) { 
          return true;
      }
    
      return false;
    }


  analyse = () => {

   

    
    var url = "http://localhost:5000/sentiment";
    
    fetch(url,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'hashtag': this.state.hashtag,
        'tweetsCount' : this.state.tweetsCount
      }),

    })
      .then(response => response.json())
      .then(result => {

        if(result.result.Polarity === 0)
        {
          this.setState({tweet:false});
          this.setState({showProgress:false});
         
        }
        else{

        
        this.setState({showProgress:false});

        this.setState({positive:result.result.Positive});
        this.setState({negative:result.result.Negative});
        this.setState({neutral:result.result.Neutral});
        this.setState({polarity:result.result.Polarity});



        this.setState({showPie:true});

       
        
        console.log(result);
      }



      } )
      .catch(error => console.log('error', error));



  }



   


  render() {
 
   const positive = this.state.positive;
   const negative = this.state.negative;
   const neutral = this.state.neutral;

   let emotion;

   if(positive >= negative && positive >= neutral) {
       emotion = "positive";
   }
   else if (negative >= positive && negative >= neutral) {
       emotion = "negative";
   }
   else {
       emotion = "neutral";
   }
   
   

   


    return (
     
<>
<Container fluid>
       

          <Row style={{backgroundColor:'#EA2025',height:"150px"}}>

          <Col  xs={6} md={4}>  </Col>
  
          <Col  xs={6} md={4}>  
            
             <>
             <h1 style={{fontSize:70,color:'white',marginTop:'0px',textAlign:'center',marginBottom:0,paddingBottom:0,paddingTop:10}}>SANTANDER</h1>
             <h2 style={{marginTop:'0px',color:'white',textAlign:'center',fontSize:'15px'}}>Application to analyse twitter sentiment ...</h2>
             </>
             
          
          </Col>
          <Col  xs={6} md={4}></Col>
       
          </Row>


          <Row fluid>
           
              <Col style={{backgroundColor:'#cccccc',height:'10px'}}></Col>
           
          </Row>
</Container>

<Container>
          {this.state.search ? 
            <Row>
                <Col xs={3}></Col>

               
                <Col xs={6} style={{marginTop:150, }}>
                  
                    <Form  onSubmit={this.search}>
                        
                        <input type="text" 
                        
                         onChange={event => this.setState({ hashtag: event.target.value}) }
                         style={{width:500,textAlign:'center'}} placeholder="Enter keyword/hashtag to search about:" />

                         <input type="text" 
                        
                         onChange={event => this.setState({ tweetsCount: event.target.value}) }
                         style={{width:500 ,marginTop:5, textAlign:'center', alignItems:'center'}} placeholder="How many tweets you want to analyse:" />
                      
                        &nbsp;&nbsp;
                        <Button variant="danger" type="submit" clsss="text-center" style={{textAlign:'center',marginTop:10,width:500}}>
                      
                        Analyse Tweets
                        </Button>
                   
                    </Form>

               

                    </Col>
                   

                    <Col xs={3}></Col>

          </Row>

          :
                    <Row>
                        
                    <Col xs={12}>

                    {this.state.showProgress ? 
                    <div>
                    <ProgressBar  animated now={this.state.progress} style={{marginTop:150}} />
                    <h3 style={{fontSize:'12px', textAlign:'center',marginTop:'5px'}}>Analysizing your tweet...please wait...</h3>
                    </div>
                    : null }

                    </Col>

                     
                    {this.state.tweet ? 

                    <>  

                    <Col>

                    
                    {this.state.showPie ? 
                    
                    <>
                   

                            <div>
                            <h1 style={{fontSize:18,fontWeight:700, marginTop:80, marginLeft:10,padding:10}}>Graphical Representation Of Tweet: {this.state.hashtag}</h1>
                            </div>
                      
                              <div style={{width:400,height:400, }}>

                             

                                <PieChart
                                label={(props) => { return props.dataEntry.title;}}
                                labelPosition={65}
                                labelStyle={{
                                  fontSize: "6px",
                                  fontColor: "FFFFFA",
                                  fontWeight: "600",
                                }}
                                data={[
                                  { title: this.state.positive + "%" , value: parseInt(this.state.positive), color: 'green' },
                                  { title:  this.state.neutral + "%" , value: parseInt(this.state.neutral), color: 'yellow' },
                                  { title:  this.state.negative + "%" , value: parseInt(this.state.negative), color: 'red' },
                                ]}
                              />

                              <div style={{flexDirection:'column'}}>  
                              <div style={{width:15,height:15, backgroundColor:'green',}}>
                                <p style={{fontSize:10,marginLeft:20,}}>Positive</p>
                              </div>
                              <div style={{width:15,height:15, backgroundColor:'yellow',marginTop:10}}>
                                <p style={{fontSize:10,marginLeft:20}}>Neutral</p>
                              </div>
                              <div style={{width:15,height:15, backgroundColor:'red',marginTop:10}}>
                                <p style={{fontSize:10,marginLeft:20}}>Negative</p>
                              </div>
                              </div>  

                              
                              </div>
                   
                                
                    </>
                    :
                    null
                    }
                    </Col>

                    <Col>
                    
                    {this.state.showPie ? 
                    
                    <>
                                                  
                                                      
                                                      
                    <div>
                            <h1 style={{fontSize:18,fontWeight:700, marginTop:80, marginLeft:10,padding:10}}>Emotional Representation Of Tweet: {this.state.hashtag}</h1>
                            </div>
                      
                              <div style={{width:400,height:400, }}>


                                <div style={{marginTop:40,marginLeft:150}}>

                                <img src={emotion == "positive" ? epositive : emotion == "negative" ? enegative : emotion == "neutral" ? eneutral : null }  style={{width:"120px", alignItems:'center'}} />

                                </div>

                            
                             
                               <img src={emoji}  style={{width:400, marginTop:'90px'}} />
                             
                              
                              </div>


                    </>
                    :
                    null
                    }
                                                      
                    </Col>

                    </>
                    
                 : 
                 
                 <Col>
                 
                 <div style={{textAlign:'center',alignItems:'center'}}>
                 <h1 style={{marginTop:200, textAlign:'center',fontSize:19}}>Sorry, We could not found anythig with that keyword. Search again with correct keyword !!!</h1>
                 <Button variant="danger"  onClick={function(e) { window.location.reload(); } }  style={{textAlign:'center',marginTop:10,width:500}}>
                      
                      Search Again
                  </Button>

                  </div>
                 
                 </Col>
                 
                 
                 
                  }
                   

                    </Row>
        }
</Container>
       
     </>
    );
  }
}



