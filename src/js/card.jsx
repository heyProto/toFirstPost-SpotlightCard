import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class toCard extends React.Component {

  constructor(props) {
    super(props)
    let stateVar = {
      fetchingData: true,
      dataJSON: {},
      optionalConfigJSON: {},
      languageTexts: undefined,
      siteConfigs: this.props.siteConfigs,
      activeCounter : 1
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    this.state = stateVar;
  }

  exportData() {
    return this.props.selector.getBoundingClientRect();
  }

  componentDidMount() {
    if (this.state.fetchingData) {
      let items_to_fetch = [
        axios.get(this.props.dataURL)
      ];

      axios.all(items_to_fetch).then(axios.spread((card) => {
        let stateVar = {
          fetchingData: false,
          dataJSON: card.data,
          optionalConfigJSON:{},
          activeCounter:1
        };
        this.setState(stateVar);
      }));
    } 
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.dataJSON) {
      this.setState({
        dataJSON: nextProps.dataJSON
      });
    }
  }

  selectTab(tab){
    this.setState({activeCounter:tab+1});
  }

  renderTabs(){
      let tabs =['summary','details'];
      let tabNames;
      
      tabNames = tabs.map((card,i)=>{
      let tabClass;
      tabClass = (this.state.activeCounter == i+1)  ? ((this.state.mode == "col-7")?"single-tab active":"single-tab single-tab-mobile active") : ((this.state.mode == "col-7")?"single-tab":"single-tab single-tab-mobile");
      return(
          <div key={i.toString()} className={tabClass} style={{cursor:"pointer"}} onClick={()=>this.selectTab(i)}>{tabs[i]}</div>
      )
      });
      return tabNames;
  }
  
  renderTabContent(tab){
    let data = this.state.dataJSON.data;
    switch(tab){
      case 1:
        return(
            <div className="card-content-div">
            <div>  
              <div className="half-width-parameter">
                <div className="single-parameter">
                  <div className="parameter-label">COMPLAINANT'S NAME</div>
                  <p>{data.complainant_name ? data.complainant_name : 'Not available'}</p>
                </div>
                <div className="single-parameter">
                  <div className="parameter-label">COMPLAINANT'S DESIGNATION</div>
                  <p>{data.complainant_des ? data.complainant_des : 'Not available'}</p>
                </div>
                <div className="single-parameter">
                  <div className="parameter-label">COMPLAINANT'S ORGANIZATION</div>
                  <p>{data.complainant_org ? data.complainant_org : 'Not available'}</p>
                </div>
                <div className="single-parameter">
                  <div className="parameter-label">NATURE OF HARASSMENT</div>
                  {data.nature.map(e => {return(<p>{e}</p>)})}
                </div>
              </div>
              <div className="half-width-parameter">
                <div className="single-parameter">
                  <div className="parameter-label">INDUSTRY</div>
                  <p>{data.industry ? data.industry : 'Not available'}</p>
                </div>
                <div className="single-parameter">
                  <div className="parameter-label">CONTEXT</div>
                  <p>{data.context ? data.context : 'Not available'}</p>
                </div>
                <div className="single-parameter">
                  <div className="parameter-label">ACTION TAKEN</div>
                  <p>{data.action_taken ? data.action_taken : 'Unknown'}</p>
                </div>
                <div className="single-parameter">
                  <div className="parameter-label">YEAR</div>
                  <p>{data.year ? data.year : 'Not available'}</p>
                </div>
              </div>
              </div>
            </div>
        )
        break;
      case 2:
        return(
            <div className="card-content-div">
              <div className="single-parameter">
                  <div className="parameter-label">ACCOUNT EXCERPT</div>
                  <p>{data.text ? data.text : 'Not available'}</p>
              </div>
              <div className="divider" />
              <div className="half-width-parameter">
                <div className="single-parameter">
                  <div className="parameter-label">JUDGE</div>
                  <p>{data.judge_name ? data.judge_name : 'Not available'}</p>
                </div>
                <div className="single-parameter">
                  <div className="parameter-label">BENCH</div>
                  <p>{data.bench ? data.bench : 'Not available'}</p>
                </div>
              </div>
              <div className="half-width-parameter vertical-divider">
                <div className="single-parameter">
                  <div className="parameter-label">PETITIONER (TYPE)</div>
                  <p>{data.petitioner ? data.petitioner : 'Not available'} {data.petition_type ? '(' + data.petition_type + ')' : ''}</p>
                </div>
                <div className="single-parameter">
                  <div className="parameter-label">RESPONDENT (TYPE)</div>
                  <p>{data.respondent ? data.respondent : 'Not available'} {data.respondent_type ? '(' + data.respondent_type + ')' : ''}</p>
                </div>
              </div>
              <div className="divider"/>
              <div className="half-width-parameter">
                  <div className="single-parameter">
                    <div className="parameter-label">DISPOSITION</div>
                    <p>{data.petition_result ? data.petition_result : 'Not available'}</p>
                  </div>
              </div>
            </div>
        ) 
    } 

  }

  getCardStatus(status, defaultValue = '') {

    // if(status) {
    //   if (status === 'Dismissed')
    //       status = "Cancelled";
    //   else if (status === 'Disposed')
    //       status = "Done";
    //   else if (status === 'Ongoing')
    //       status = "Ongoing";
    //   else if (status === 'To be listed')
    //       status = "To be listed";
    //   else status = defaultValue;
    // } else {
    //     status = defaultValue;
    // }
    switch(status) {
      case "Dismissed": return "proto-card-status-cancel";
      case "Ongoing": return "proto-card-status-ongoing";
      case "Disposed": return "proto-card-status-done";
      case "To be listed": return "proto-card-status-unlisted";
      default: return "proto-card-status-none";
    }
  }

  renderCol7() {
    let data = this.state.dataJSON.data;
    if (this.state.fetchingData ){
      return(<div>Loading</div>)
    }
    else { 
      return (
        <div className="protograph-col7-mode">
          <div className="dte-case-card">
            <div className="card-header">
            <div className="card-title">{data.accused_name}</div>
            <div className="card-subtitle">{data.accused_des ? data.accused_des : 'Designation'}, {data.accused_org ? data.accused_org : 'Organization'}</div>
            <img className="card-image" src="placeholder-user.png" />
            </div>
            <div className="card-tabs">{this.renderTabs()}</div>
            <div className="card-content">
              {this.renderTabContent(this.state.activeCounter)}
            </div>
            <div className="card-footer">
              <img src={'https://cdn.protograph.pykih.com/Assets/proto-cards/dte-logo.png'}/>
            </div>
          </div>         
        </div>
      )
    }
  }

  renderCol4() {
    if (this.state.fetchingData) {
      return (<div>Loading</div>)
    } else {
      let data = this.state.dataJSON.data;
      return (
        <div className="protograph-col4-mode">
          <div className="dte-case-card dte-case-card-mobile">
          <div className="card-header">
            <div className="card-title">{data.accused_name}</div>
            <div className="card-subtitle">{data.accused_des ? data.accused_des : 'Designation'}, {data.accused_org ? data.accused_org : 'Organization'}</div>
            <img className="card-image" src="placeholder-user.png" />
            </div>
            <div className="card-tabs card-tabs-mobile">{this.renderTabs()}</div>
            <div className="tabContent">
              <div className="tab-content">
                  {this.renderTabContent(this.state.activeCounter)}
              </div>
            </div>  
            <div className="card-footer card-footer-mobile">
              <img src={'https://cdn.protograph.pykih.com/Assets/proto-cards/dte-logo.png'}/>
            </div>
          </div>         
        </div>
      )
    }
  }


  render() {
    switch(this.props.mode) {
      case 'col7' :
        return this.renderCol7();
      case 'col4':
        return this.renderCol4();
    }
  }
}
