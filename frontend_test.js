var Url = require('url-parse');
const queryString = require('query-string');
var async = require('async');
const fetch = require("node-fetch");
var new_url = "https://www.goibibo.com/hotels/meta/google/8717279093827200968/2887756121636922413/%7B%22ci%22:%2220190530%22,%22co%22:%2220190531%22,%22r%22:%221-2_0%22,%22ibp%22:%22v3%22%7D/?hquery={%22ci%22:%2220190530%22,%22co%22:%2220190531%22,%22r%22:%221-2_0%22,%22qd%22:%2220190530-20190531-1-2_0%22,%22ibp%22:%22v3%22}&utm_source=google&utm_medium=cpc_hpa&utm_campaign=Hotel_Price_Ads_Desktop_Default_2887756121636922413&vendor=ing&p=1721.00&c=INR&gclsrc=ha&gclid=AA80Osx-KYdU638KfIt1RX2MzcjtDiAO4bbhgQOefygHa-33lAWsCDK-KIRLRVZkjvjS6KNab8x1vnAVVI9YZdR5DkmxTZB24C3w-18";
var url = new Url('https://www.goibibo.com/hotels/meta/google/8717279093827200968/2887756121636922413/%7B%22ci%22:%2220190530%22,%22co%22:%2220190531%22,%22r%22:%221-2_0%22,%22ibp%22:%22v3%22%7D/?hquery={%22ci%22:%2220190530%22,%22co%22:%2220190531%22,%22r%22:%221-2_0%22,%22qd%22:%2220190530-20190531-1-2_0%22,%22ibp%22:%22v3%22}&utm_source=google&utm_medium=cpc_hpa&utm_campaign=Hotel_Price_Ads_Desktop_Default_2887756121636922413&vendor=ing&p=1721.00&c=INR&gclsrc=ha&gclid=AA80Osx-KYdU638KfIt1RX2MzcjtDiAO4bbhgQOefygHa-33lAWsCDK-KIRLRVZkjvjS6KNab8x1vnAVVI9YZdR5DkmxTZB24C3w-18');



var cid = url.pathname.split('/')[4];
var hid = url.pathname.split('/')[5];

const getQueryStringParameters = url => {

    if (url){
      if(url.split("?").length>0){
      query = url.split("?")[1];
    }
    }else{
       url = window.location.href;
       query = window.location.search.substring(1);
    }
    return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
    let [ key, value ] = param.split('=');
    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
    return params;
  }, { });
};

var params = getQueryStringParameters(new_url);
var hquery = JSON.parse(params.hquery);


var hermes_1 =  url.protocol + "//hermes.goibibo.com/hotels/v7/search/data/v3/" + cid +"/"  + hquery.ci +"/" + hquery.co +"/" + hquery.r + 
                        "?s=popularity&cur="+  params.c +"&f={}&sb=0&vendor=" + params.vendor + "&ts=%7B%22sm%22:%22" + params.utm_source + "%20/%20" + params.utm_medium + "%20/%20" + params.utm_campaign + "%22,%22t%22:1557985701316%7D&pid=0&im=true" ;
var hermes_dp_url = url.protocol+ "//hermes.goibibo.com/hotels/v7/detail/price/v3/" +  cid +"/"  + hquery.ci +"/" + hquery.co +"/" + hquery.r +"/" + hid + "?ibp=v3&im=true&slot=true";
var hermes_bp_url = "https://www.goibibo.com/hotels/personalized-getHotelDescBlock/?per=1";
var payment_url = "https://www.goibibo.com/hotels/payment/";


// all flags
var flag_hermes_srp =0;
var flag_hermes_dp =0;
var flag_bp =0;
var flag_payment =0;

const querydata=
{"reprice_new": 1, "offercode": "", "code": "getsetgo", "rtc": "45000068086", "HotelRating": [0], "noOfNights": "1", "rpc": "990000091678", "selection": "reco-noncart", "rooms": [{"childs": [], "adults": "2"}], "country_code": "IN", "voyagerid": "2887756121636922413", "gohtlid": "HTLGBO1000029268", "checkin_display": "Thu, 30 May 2019", "vcid": "8717279093827200968", "city": "Goa", "noofAdults": 2, "pax": "1-2_0", "HotelAddress": "Hotel Goa's Pearl, 112- C, Fatawaddo, Nerul, Bardez Goa, 403114 ", "destination": "Goa, India", "pay_mode": 1, "chkoutdate": "20190531", "noofChildren": 0, "location": "Candolim Area", "metaPrice": "1721", "chkindate": "20190530", "checkout": "20190531", "newui": "True", "fwdParams": {"ps": "2000|2000|240", "vhid": "2887756121636922413", "srctx": "", "hctxty": "", "ts": "2019-05-16T13:11:26", "hctx": ""}, "vertical": "hotels", "metaPartner": "google", "checkin": "20190530", "strQry": "hotels-8717279093827200968-20190530-20190531-1-2_0", "cf": 0, "rooms_config": "2_0", "hc": "2887756121636922413", "country": "India", "Image": "https://gos3.ibcdn.com/goas-pearl-goa-42821545641r.jpg", "checkout_display": "Fri, 31 May 2019", "HotelName": "Monash Goa's Pearl", "v": "v3", "sd_code": "", "sb": 0, "noofRooms": "1", "star": 1};

const reqData = {
    code: querydata.code !== undefined ? querydata.code.toUpperCase() : '',
    ajax : 'true',
    version: 'v2',
    querydata: JSON.stringify(querydata)
  };

const bp_data = queryString.stringify(reqData);

const qryDict = {"offercode": "5103213082", "code": "getsetgo", "rtc": "45000489171", "HotelRating": [0, 1, 2], "noOfNights": "1", "rpc": "990001028384", "selection": "reco-noncart", "rooms": [{"childs": [], "adults": "2"}], "country_code": "IN", "voyagerid": "344627908876975495", "gohtlid": "HTLGBO1000203756", "checkin_display": "Thu, 30 May 2019", "vcid": "8717279093827200968", "city": "Goa", "noofAdults": 2, "pax": "1-2_0", "HotelAddress": "2, Titos Lane 2, Bardez, Saunta Vaddo, Baga, Goa", "destination": "Goa, India", "pay_mode": 1, "chkoutdate": "20190531", "noofChildren": 0, "location": "Baga Area", "strQry": "hotels-8717279093827200968-20190530-20190531-1-2_0", "chkindate": "20190530", "checkout": "20190531", "newui": "True", "fwdParams": {"ps": "10042|4518|0", "vhid": "344627908876975495", "srctx": "", "hctxty": "", "ts": "2019-05-16T18:55:07", "hctx": ""}, "vertical": "hotels", "checkin": "20190530", "cf": 1, "rooms_config": "2_0", "hc": "344627908876975495", "country": "India", "Image": "https://cdn1.goibibo.com/t_r/capital-o-19582-la-habbana-beach-resort-and-club-goa-17-classic__room-152887023653-orijgp.jpg", "checkout_display": "Fri, 31 May 2019", "HotelName": "Capital O Premium La Habbana Beach Resort and Club ", "v": "v3", "sd_code": "", "sb": 0, "noofRooms": "1", "star": 3};
const booking = {"offercode":"5103213082","is_akb":0,"bookingPagePromos":[{"chunk_key":"go5000_promo_popup","value":"Use Promocode GO5000 for Free Shopping worth Rs.5000","key":"GO5000"}],"ordis":0,"country_code":"IN","vested_gocash":0,"property_type":"Resort","vcid":"8717279093827200968","pahpromotext":"","netamt_to_vendor":0,"dispPromoBox":"True","grandtotal":4608,"uuid":"jainparag00@gmail.com","ty":"regular","base_to_vendor":0,"vendor_fcdt_org":"May 30, 2019 12:00 hours","Inclusions":["Accommodation only","Room service","Free Wifi","Taxes","Accommodation"],"is_domestic":1,"hotel_country_code":"IN","non_refundable":0,"totalordis":0,"is_pahcc":0,"vhid":"344627908876975495","vendor_fcdt_com":"May 30, 2019 12:00 hours","hotel_gstn":"","dispPromoBox_guest":1,"pahptxt":"","affiliate_partner_name":"goibibo","checkin_time_array":["I don`t know","12 PM - 3 PM","3 PM - 6 PM","6 PM - 9 PM","9 PM - 12 AM","12 AM - 3 AM(May 31)","3 AM - 6 AM(May 31)"],"personalized_keys":{"gc_on_amt":4518,"pgc":0,"conv_fee":90,"tax":90,"gd":0,"np_wogc":3479,"pcbj":{"p":0,"m":"","t":"","d":0},"tsm":"","ts":6653,"tp":4518,"govt_taxes_and_fees":90,"pc":"GETSETGO","np":3389,"hotel_taxes":0,"tp_alltax":4608,"total_amt_without_govt_taxes":4451,"np_wt":3479,"applied":1,"c":"GETSETGO","pdj":{"p":0,"m":"","t":"percentage","d":1129},"egc":0,"npgc":0},"promoDiscountdisplay":-1129,"applicable_sku":{"velocity":3,"percentage":100,"gravity":4000},"international_params":{"currency_name":"Indian Rupee","currency":"INR","timezone":"Asia/Calcutta","country_code":"91","currency_font_family":"icon-rupee","currency_symbol":"Rs.","country":"india","booking_prefix":"","tz_code":"IST"},"is_gobiz":0,"crystal_reprice":true,"bookingcode":"","chain_code":"oyorms","netamt":3400.54,"checkouttime":"11:00 AM","sd_code":"","noofRooms":"1","promotxt":"GETSETGO","sd_text":"","is_pah_only":0,"bucket_gocash":0,"non_vested_credits":0,"dispPromoBox_all":1,"star":3,"gohtlid":"HTLGBO1000203756","hermes_reprice_url":"","spec_req_disp":true,"taxincluded":true,"goibibo_bookingcharges":90,"noofAdults":2,"goibibo_bookingcharges_message":"","pay_mode":1,"hotel_location":"baga area","meal_plan_code":"EP","international_card":{"reason":"","international_card_allowed":1},"fwdParams":{"ps":"10042|4518|0","fwdparams":[{"ps":"10042|4518|0","vhid":"344627908876975495","srctx":"","hctxty":"","ts":"2019-05-16T18:57:13","hctx":""}],"vhid":"344627908876975495","srctx":"","hctxty":"","ts":"2019-05-16T18:57:13","hctx":""},"isPostBooking":"False","user_tier_name":"Bronze","TotalTaxCharges_without_bookingcharges":0,"credits":"True","goibibo_partial_refundable":0,"freecancel":0,"sbset":"0000","roomWiseRent":[{"childs":0,"adults":"2","roomNo":"Room 1","orrate":4518,"room_total":"4518","originalRate":4518,"avgRent":4518}],"farebreakup":{"goibibo_discount":0,"property_service_charges_pah":0,"gocashpromovalue":0,"gocashpromovalue_bgcp":1.6600000000000001,"property_service_charges":0,"promoDiscount_pg_msg":"","gocashpromocode":"GETSETGO","aftrpromototal":3479,"ordis":0,"addons_grandtotal":0,"promoDiscount":-1129,"vendor_discount":5524,"netamt_to_vendor":0,"TotalTaxCharges_without_bookingcharges":0,"goibibo_bookingcharges":90,"TotalTaxCharges":90,"base_to_vendor":0,"roomWiseRent":[{"childs":0,"adults":"2","roomNo":"Room 1","orrate":4518,"room_total":"4518","originalRate":4518,"avgRent":4518}],"goibibo_bookingcharges_message":"","is_pre_post_combined_offer":0,"govt_taxes_and_fees":90,"TotalTaxCharges_pah":0,"is_cashgocash_combined_offer":1,"promoDiscount_pg_type":"instant","xchange_rate":1,"netamt_org":3400.54,"totalordis":0,"goibibo_markup":0,"totalRoomRent":4518,"orig_xchange_rate":1,"promoDiscount_pg":0,"gocashpromopercentage":0,"grandtotal":4608,"output_currency":"INR","discount":0,"booking_charges_non_refundable":0,"goibibo_discount_reason":"","total_amt_without_govt_taxes":4451,"ExtraGuestCharge":0,"hcp":{},"subtotal":4518,"gocashpromovalue_bgc":75,"gocashcalculate_on_amount":4518,"addon_total_pah":0,"gocashpromovaluenp":0,"flavour":"v3","extra_discount":0,"promoDiscount_pg_display":0,"netamt":3400.54,"gocashpromovaluenpp":0,"extra_discount_type":"","goibibo_markup_reason":"","extra_discount_message":"","addon_total":0,"display_promo_discount":1129,"promotxt":"GETSETGO"},"sku_query":"hotels_dom#1_v3#default#default","discount":0,"country":"India","non_vested_gocash":0,"RoomTypeName":"Classic Room","hash_udf2":"b701554c092cec6f8715c16c01ba5c76","checkintime":"12:00 PM","reserve_now":0,"goibibo_non_refundable":0,"aftrpromototal":3479,"cf":1,"non_vested_credits_org":0,"vcc_payment":0,"hotel_country_name":"india","is_go999_booking":false,"message":"","promoDiscount":-1129,"fb_list":[{"s":"","fs":"12","v":"4518","cc":"#000000","k":"Room Charges","fw":"400","c":"₹","id":"htl-charge"},{"s":"-","fs":"12","v":"1129","cc":"#000000","k":"Goibibo Discount","fw":"400","c":"₹","id":"htl-promo-disc"},{"s":"","fs":"14","fw":"800","v":"3389","cc":"#000000","k":"SubTotal","v_wogc":"3389","c":"₹","id":"htl-net-payable"},{"s":"","fs":"12","v":"90","cc":"#000000","k":"Convenience Fees","fw":"400","c":"₹","id":"htl-conv-fee"},{"s":"","fs":"16","fw":"800","v":"3479","cc":"#000000","k":"Pay Now","v_wogc":"3479","c":"₹","id":"htl-total"},{"s":"","fs":"14","fw":"800","v":"1129","cc":"#00B318","k":"Total Savings","v_wogc":"1129","c":"₹","id":"htl-savings"}],"city":"Goa","promo_applied":1,"TotalTaxCharges":90,"max_gocash":0,"HotelAddress":"2, Titos Lane 2, Bardez, Saunta Vaddo, Baga, Goa","destination":"Goa, India","noofNights":"1","sbsst":"0000","tz_info":{},"extramsg":[],"go999_data":{},"applicablepromolist":[{"code":"GETSETGO","vendor":"ingoibibo$exp","url":"https://www.goibibo.com/offers/greatest-hotel-sale/","domestic":[1],"msg":"Apply coupon GETSETGO and get Upto 50% instant discount. T&C apply","highlight":0},{"code":"CASHBACK","vendor":"ingoibibo","url":"https://www.goibibo.com/offers/","domestic":[1],"msg":"Use code CASHBACK to save your discounts and use them later on your personal booking on Flights, Hotels, Bus, Train and Car","highlight":1},{"code":"HOTELSURPRISE","vendor":"ingoibibo","url":"https://www.goibibo.com/offers/","domestic":[1],"msg":"Running low on goCash plus? Use code HOTELSURPRISE and unlock your special offer","highlight":0}],"location":"Baga Area","ogsf":0,"is_quickbook":false,"HotelRating":[0,1,2],"ht":"Resort","is_domestic_org":1,"ExtraGuestCharge":0,"gocashpromocode":"GETSETGO","freecanceldate":"","gocashcalculate_on_amount":4518,"is_phonepe_booking":false,"applicablepromolist_pp":[{"bank_name":"","vendor":"ingoibibo$test","chunk_key":"greatest_bookingpage_popup","dom":1,"promo_type":"DEAL","value":"Apply HDFCDH to get upto INR 1500 off on HDFC credit cards","key":"HDFCDH","highlight":1},{"bank_name":"","vendor":"ingoibibo$test","chunk_key":"greatest_bookingpage_popup","dom":1,"promo_type":"DEAL","value":"Running low on goCash plus? Use code HOTELSURPRISE and unlock your special offer","key":"HOTELSURPRISE","highlight":0},{"bank_name":"","vendor":"ingoibibo$test","chunk_key":"greatest_bookingpage_popup","dom":1,"promo_type":"DEAL","value":"Use code CASHBACK to save your discounts and use them later on your personal booking on flights, hotels, Bus, Train and Car.","key":"CASHBACK","highlight":0}],"aftrpromototaldisplay":3479,"total_credits":0,"payment_type":1,"bucket_credits":0,"Image":"https://cdn1.goibibo.com/t_r/capital-o-19582-la-habbana-beach-resort-and-club-goa-17-classic__room-152887023653-orijgp.jpg","ibibopartner":"ingoibibo","lock":false,"HotelName":"Capital O Premium La Habbana Beach Resort and Club ","user_pan_config_data":{"default_user_profile":"","is_mandatory":0,"enable_pan_card":0},"checkin_display":"Thu, 30 May 2019","checkout_display":"Fri, 31 May 2019","early_checkin":false,"non_vested_gocash_org":0,"vendor_fcdt":"May 28, 2019 12:00 hours","log_tracker":"ldxbpvgvw8k3cx2f2asqpef23npgfudg42799701","noofChildren":0,"limit_exceeded":false,"auto_checkin":0,"contracttype":"b2c","is_pah":0,"meta_data":{"tvc_ts":"google","tm":"none","ts":"direct","tvc_tm":"cpc_hpa"},"user_balance":{"status_code":200,"data":{"ipl_refer_credits":{"amount_earned":0,"referred_users":0,"matches_earned":0},"np_amt":0,"ipl_credits":[{"gc_earned":35,"match_id":"krbc04192019190293","date_credited":"2019-04-21T23:59:59","match_name":"KKR vs RCB","date_created":"2019-04-20T00:36:23","expired":true}],"is_locked":0,"p_amt":0,"last_credit_expiry":"2019-04-21T23:59:59","t_amt":0,"b_amt":0,"credits_id":53487339},"success":true},"availrmcnt":5,"is_tax_pah":0,"hotel_state":"goa","subtotal":4518,"peshkash_data":{"gv":1129,"p_id":"","npgcb":0,"exp_id":"","ppromo":"getsetgo","gccbpact":0,"discount_plus_hcp":1129,"nm":0,"priority":"2999","pa":true,"fp":75.02,"gpcbv":75,"user_segment":"","gc_sg":"","gcp_sg":"","cf_id":"20190516134917_607","user_segment_gocash":"","npgcbp":0,"is_hcp_applied":false,"gv_before_fp":1129,"gccbv":0,"sg":"","gpcbpact":1.6600000000000001},"totalRoomRent":4518,"vendor_discount":5524,"vested_credits":0,"emi_details":{"emi":"1159","emi_description":{"nine_months":"386","three_months":"1159","six_months":"579","final_price":"3479","tax_and_fee":"90","base_price":"3389"}},"udf1":"de8109c5de2d37ce98bf50e97d333e72","addon_list":[],"gsf":0,"app_versioncode":0,"sb":0,"sf":"","goibibo_partial_refundable_str":"","offer_key":""};
const reqDataPayment = {
    type: 'personal',
    is_business_profile_selected: 'False',
    user_business_profile_email: '',
    pay_gst_number: '',
    pay_gst_company_name: '',
    pay_gst_business_email: '',
    pay_gst_company_address: '',
    pay_gst_admin_email: '',
    pay_gst_phone_number: '',
    vertical: 'hotels',
    productid: '',
    voyagerid: '344627908876975495',
    gohtlid: '',
    qryDict: JSON.stringify(qryDict),
    bookingdata : JSON.stringify(booking),
    querydata: '',
    guest: 'guest',
    hiddenPrice: '3479',
    leadcodelist: '[]',
    code: 'GETSETGO',
    amountCr: 'de8109c5de2d37ce98bf50e97d333e72',
    hiddenudf4: '',
    hiddenudf5: '',
    avoiddupe: '',
    fwdParams: '',
    internationalhotels: 'False',
    cityid: '8717279093827200968',
    cityname: 'Goa',
    newui: 'True',
    dispPromoBox: 'True',
    partner: 'goibibo',
    actualamount: "",
    actualcredits: '0',
    paytype: 'goCashCards',
    totfare: '3479',
    cr_prod_name: 'gi.hotels.trip',
    otp: 'False',
    gocashpromocode :'',
    choose: '1',
    firstname1: 'Parag',
    lastname1: 'Jain',
    choose2: '1',
    firstname2: '',
    lastname2: '',
    email:'jainparag00@gmail.com',
    country_code: '',
    mobile: '9971017822',
    customer_pan_no: '',
    expected_checkin_time: '',
    special_requests: '',
    firstname: 'Parag',
    lastname: 'Jain',
    address: 'ibibo Web Private Limited, 5th Floor, Good Earth City Centre, Sector 50, Gurgaon, Haryana-122018',
    city: 'gurgaon',
    pincode: '122002',
    state: 'Delhi',
    country: 'Country',
    landline: 'Landline',
    credits: '0',
    payuId: '',
    password: '',
    total_credits: '',
    vested_credits: '',
    non_vested_credits: '',
    credits_amount: '0',
    non_vested_gocash: '0',
    vested_gocash: '0',
    vertical_redmp: '10',
    native_pay_amnt: '3479',
    go_pn: '1',
    go_pg: 'payu',
    go_pn: '1',
    pay_mode: '1',
    payment_type: '1',
    is_domestic: '1'
};
const payment_data = queryString.stringify(reqDataPayment);

const tasks = [
 async function hermes_srp() {
      await  fetch( hermes_1)
        .then((res) => { return res.json() })
        .then((data) => {
                    if(data.data.length >0 && data.city_meta_info.vcid ==cid)
                    {
                        console.log('Hermes_srp is working');
                        flag_hermes_srp =1;
                    }

        }).catch(function (err) {
            console.log("hermes_srp is not working");
        })

  
      },
 async function hermes_dp() {
      await  fetch( hermes_dp_url)
        .then((res) => { return res.json() })
        .then((data) => {
                    

                    if(data.data.reg.length >0 )
                    {
                        console.log('Hermes_dp is working');
                        flag_hermes_dp =1;
                    }

        }).catch(function (err) {
            console.log("hermes_dp is not working");
        })
      },

async  function bp() {
     await  fetch(hermes_bp_url, {
        method: 'POST',
        body: bp_data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        })
        .then(response => response.json())
        .then((data) => {
            console.log("bp is working ");
            flag_bp=1;

        }).catch(function (err) {
        console.log("bp is not working");
        })

      },

  async function payment() {
        await fetch(payment_url, {
          method: 'POST',
          body: payment_data,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          })
          .then(response => response.json())
          .then((data) => {
              console.log("payment is working fine");
              flag_payment=1;
  
          }).catch(function (err) {
          console.log("payment is not working");
          })
       }   
  
];

async.series(tasks, (err, results) => {
  if (err) {
      console.log(err);
  }
  return console.log("All API flags" , " flag_hermes_srp ="+ flag_hermes_srp , " flag_hermes_dp ="+ flag_hermes_dp, " flag_bp ="+ flag_bp, 'flag_payment =' + flag_payment);
})



      



