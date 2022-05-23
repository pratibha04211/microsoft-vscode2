import { LightningElement,track,api,wire} from 'lwc';
// import Valid8MemberCSS from '@salesforce/resourceUrl/Valid8MemberCSS';
// import { loadStyle } from 'lightning/platformResourceLoader';
import getProfileDetails from '@salesforce/apex/Member_JobPortal.getProfileDetails';

export default class Member_CriminalCheck extends LightningElement {

    @track allProfileData = null;
    @track allAliases=null;
 
    @api memberId;
    @api memberName;
    @track hideAliases=false;
    @track nodata='-';

    async connectedCallback(){
        this.memberName = this.getUrlParamValue(window.location.href, 'MemberName');
        this.memberId = this.getUrlParamValue(window.location.href, 'MemberId');
        console.log('memberName-->'+this.memberName);
        console.log('memberId-->'+this.memberId);

        await this.getProfileData();
        
        // Promise.all([
        //     loadStyle( this, Valid8MemberCSS)
        
        //     ]).then(() => {
        //         console.log( 'Files loaded' );
        //     })
        //     .catch(error => {
        //         console.log(JSON.stringify(error));
        // });
    }

    //Get Member ID and Member Name from URL
    getUrlParamValue(url, key) {
    return new URL(url).searchParams.get(key);
    }

    //To get Profile Data
    async getProfileData(){
        this.loader=true;
        await getProfileDetails()
        .then(data => {
            if (data) {
                console.log('type of data -->'+typeof(data));
                this.allProfileData = data; 
                this.allAliases=this.allProfileData[0].Aliases;
                if(this.allAliases.length == 0)
            {
                this.hideAliases = true;
            }

                //console.log('  this.allProfileData stringy -->' + JSON.stringify(this.allProfileData));
                //console.log(' this.allAliases stringy -->' + JSON.stringify(this.allAliases));
                      
            }
        })
        .catch(error => {        
            console.log('error==' + error);
            console.log('error=>' + JSON.stringify(error));
        });
    }



            
}