<template>
<div id="cont" class="container-fluid text-center">
		<div class="row scatter">
			<div class="col-sm-9">
				<div id="chart"></div>
			</div>
			<div id = "legend" class="col-sm-3" style="padding-right: 0px; padding-left: 0px;">
				<div id="legend"></div>
			</div>
		</div>
	</div>

</template>


<script>
import * as d3 from 'd3';

export default {
  name: 'ScatterPlot',
  mounted(){
    !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.d3=e.d3||{})}(this,function(e){"use strict";function t(e){return function(){return e}}function n(e){return e[0]}function i(e){return e[1]}function r(){this._=null}function f(e){e.U=e.C=e.L=e.R=e.P=e.N=null}function u(e,t){var n=t,i=t.R,r=n.U;r?r.L===n?r.L=i:r.R=i:e._=i,i.U=r,n.U=i,n.R=i.L,n.R&&(n.R.U=n),i.L=n}function s(e,t){var n=t,i=t.L,r=n.U;r?r.L===n?r.L=i:r.R=i:e._=i,i.U=r,n.U=i,n.L=i.R,n.L&&(n.L.U=n),i.R=n}function l(e){for(;e.L;)e=e.L;return e}function a(e,t,n,i){var r=[null,null],f=F.push(r)-1;return r.left=e,r.right=t,n&&h(r,e,t,n),i&&h(r,t,e,i),B[e.index].halfedges.push(f),B[t.index].halfedges.push(f),r}function o(e,t,n){var i=[t,n];return i.left=e,i}function h(e,t,n,i){e[0]||e[1]?e.left===n?e[1]=i:e[0]=i:(e[0]=i,e.left=t,e.right=n)}function c(e,t,n,i,r){var f,u=e[0],s=e[1],l=u[0],a=u[1],o=s[0],h=s[1],c=0,d=1,v=o-l,g=h-a;if(f=t-l,v||!(f>0)){if(f/=v,v<0){if(f<c)return;f<d&&(d=f)}else if(v>0){if(f>d)return;f>c&&(c=f)}if(f=i-l,v||!(f<0)){if(f/=v,v<0){if(f>d)return;f>c&&(c=f)}else if(v>0){if(f<c)return;f<d&&(d=f)}if(f=n-a,g||!(f>0)){if(f/=g,g<0){if(f<c)return;f<d&&(d=f)}else if(g>0){if(f>d)return;f>c&&(c=f)}if(f=r-a,g||!(f<0)){if(f/=g,g<0){if(f>d)return;f>c&&(c=f)}else if(g>0){if(f<c)return;f<d&&(d=f)}return!(c>0||d<1)||(c>0&&(e[0]=[l+c*v,a+c*g]),d<1&&(e[1]=[l+d*v,a+d*g]),!0)}}}}}function d(e,t,n,i,r){var f=e[1];if(f)return!0;var u,s,l=e[0],a=e.left,o=e.right,h=a[0],c=a[1],d=o[0],v=o[1],g=(h+d)/2,C=(c+v)/2;if(v===c){if(g<t||g>=i)return;if(h>d){if(l){if(l[1]>=r)return}else l=[g,n];f=[g,r]}else{if(l){if(l[1]<n)return}else l=[g,r];f=[g,n]}}else if(u=(h-d)/(v-c),s=C-u*g,u<-1||u>1)if(h>d){if(l){if(l[1]>=r)return}else l=[(n-s)/u,n];f=[(r-s)/u,r]}else{if(l){if(l[1]<n)return}else l=[(r-s)/u,r];f=[(n-s)/u,n]}else if(c<v){if(l){if(l[0]>=i)return}else l=[t,u*t+s];f=[i,u*i+s]}else{if(l){if(l[0]<t)return}else l=[i,u*i+s];f=[t,u*t+s]}return e[0]=l,e[1]=f,!0}function v(e,t,n,i){for(var r,f=F.length;f--;)d(r=F[f],e,t,n,i)&&c(r,e,t,n,i)&&(Math.abs(r[0][0]-r[1][0])>I||Math.abs(r[0][1]-r[1][1])>I)||delete F[f]}function g(e){return B[e.index]={site:e,halfedges:[]}}function C(e,t){var n=e.site,i=t.left,r=t.right;return n===r&&(r=i,i=n),r?Math.atan2(r[1]-i[1],r[0]-i[0]):(n===i?(i=t[1],r=t[0]):(i=t[0],r=t[1]),Math.atan2(i[0]-r[0],r[1]-i[1]))}function p(e,t){return t[+(t.left!==e.site)]}function L(e,t){return t[+(t.left===e.site)]}function R(){for(var e,t,n,i,r=0,f=B.length;r<f;++r)if((e=B[r])&&(i=(t=e.halfedges).length)){var u=new Array(i),s=new Array(i);for(n=0;n<i;++n)u[n]=n,s[n]=C(e,F[t[n]]);for(u.sort(function(e,t){return s[t]-s[e]}),n=0;n<i;++n)s[n]=t[u[n]];for(n=0;n<i;++n)t[n]=s[n]}}function y(e,t,n,i){var r,f,u,s,l,a,h,c,d,v,g,C,R=B.length,y=!0;for(r=0;r<R;++r)if(f=B[r]){for(u=f.site,l=f.halfedges,s=l.length;s--;)F[l[s]]||l.splice(s,1);for(s=0,a=l.length;s<a;)v=L(f,F[l[s]]),g=v[0],C=v[1],h=p(f,F[l[++s%a]]),c=h[0],d=h[1],(Math.abs(g-c)>I||Math.abs(C-d)>I)&&(l.splice(s,0,F.push(o(u,v,Math.abs(g-e)<I&&i-C>I?[e,Math.abs(c-e)<I?d:i]:Math.abs(C-i)<I&&n-g>I?[Math.abs(d-i)<I?c:n,i]:Math.abs(g-n)<I&&C-t>I?[n,Math.abs(c-n)<I?d:t]:Math.abs(C-t)<I&&g-e>I?[Math.abs(d-t)<I?c:e,t]:null))-1),++a);a&&(y=!1)}if(y){var b,M,U,x=1/0;for(r=0,y=null;r<R;++r)(f=B[r])&&(u=f.site,b=u[0]-e,M=u[1]-t,U=b*b+M*M,U<x&&(x=U,y=f));if(y){var N=[e,t],P=[e,i],_=[n,i],k=[n,t];y.halfedges.push(F.push(o(u=y.site,N,P))-1,F.push(o(u,P,_))-1,F.push(o(u,_,k))-1,F.push(o(u,k,N))-1)}}for(r=0;r<R;++r)(f=B[r])&&(f.halfedges.length||delete B[r])}function b(){f(this),this.x=this.y=this.arc=this.site=this.cy=null}function M(e){var t=e.P,n=e.N;if(t&&n){var i=t.site,r=e.site,f=n.site;if(i!==f){var u=r[0],s=r[1],l=i[0]-u,a=i[1]-s,o=f[0]-u,h=f[1]-s,c=2*(l*h-a*o);if(!(c>=-J)){var d=l*l+a*a,v=o*o+h*h,g=(h*d-a*v)/c,C=(l*v-o*d)/c,p=G.pop()||new b;p.arc=e,p.site=r,p.x=g+u,p.y=(p.cy=C+s)+Math.sqrt(g*g+C*C),e.circle=p;for(var L=null,R=D._;R;)if(p.y<R.y||p.y===R.y&&p.x<=R.x){if(!R.L){L=R.P;break}R=R.L}else{if(!R.R){L=R;break}R=R.R}D.insert(L,p),L||(z=p)}}}}function U(e){var t=e.circle;t&&(t.P||(z=t.N),D.remove(t),G.push(t),f(t),e.circle=null)}function x(){f(this),this.edge=this.site=this.circle=null}function N(e){var t=H.pop()||new x;return t.site=e,t}function P(e){U(e),O.remove(e),H.push(e),f(e)}function _(e){var t=e.circle,n=t.x,i=t.cy,r=[n,i],f=e.P,u=e.N,s=[e];P(e);for(var l=f;l.circle&&Math.abs(n-l.circle.x)<I&&Math.abs(i-l.circle.cy)<I;)f=l.P,s.unshift(l),P(l),l=f;s.unshift(l),U(l);for(var o=u;o.circle&&Math.abs(n-o.circle.x)<I&&Math.abs(i-o.circle.cy)<I;)u=o.N,s.push(o),P(o),o=u;s.push(o),U(o);var c,d=s.length;for(c=1;c<d;++c)o=s[c],l=s[c-1],h(o.edge,l.site,o.site,r);l=s[0],o=s[d-1],o.edge=a(l.site,o.site,null,r),M(l),M(o)}function k(e){for(var t,n,i,r,f=e[0],u=e[1],s=O._;s;)if(i=w(s,u)-f,i>I)s=s.L;else{if(r=f-m(s,u),!(r>I)){i>-I?(t=s.P,n=s):r>-I?(t=s,n=s.N):t=n=s;break}if(!s.R){t=s;break}s=s.R}g(e);var l=N(e);if(O.insert(t,l),t||n){if(t===n)return U(t),n=N(t.site),O.insert(l,n),l.edge=n.edge=a(t.site,l.site),M(t),void M(n);if(!n)return void(l.edge=a(t.site,l.site));U(t),U(n);var o=t.site,c=o[0],d=o[1],v=e[0]-c,C=e[1]-d,p=n.site,L=p[0]-c,R=p[1]-d,y=2*(v*R-C*L),b=v*v+C*C,x=L*L+R*R,P=[(R*b-C*x)/y+c,(v*x-L*b)/y+d];h(n.edge,o,p,P),l.edge=a(o,e,null,P),n.edge=a(e,p,null,P),M(t),M(n)}}function w(e,t){var n=e.site,i=n[0],r=n[1],f=r-t;if(!f)return i;var u=e.P;if(!u)return-(1/0);n=u.site;var s=n[0],l=n[1],a=l-t;if(!a)return s;var o=s-i,h=1/f-1/a,c=o/a;return h?(-c+Math.sqrt(c*c-2*h*(o*o/(-2*a)-l+a/2+r-f/2)))/h+i:(i+s)/2}function m(e,t){var n=e.N;if(n)return w(n,t);var i=e.site;return i[1]===t?i[0]:1/0}function A(e,t,n){return(e[0]-n[0])*(t[1]-e[1])-(e[0]-t[0])*(n[1]-e[1])}function j(e,t){return t[1]-e[1]||t[0]-e[0]}function q(e,t){var n,i,f,u=e.sort(j).pop();for(F=[],B=new Array(e.length),O=new r,D=new r;;)if(f=z,u&&(!f||u[1]<f.y||u[1]===f.y&&u[0]<f.x))u[0]===n&&u[1]===i||(k(u),n=u[0],i=u[1]),u=e.pop();else{if(!f)break;_(f.arc)}if(R(),t){var s=+t[0][0],l=+t[0][1],a=+t[1][0],o=+t[1][1];v(s,l,a,o),y(s,l,a,o)}this.edges=F,this.cells=B,O=D=F=B=null}function E(){function e(e){return new q(e.map(function(t,n){var i=[Math.round(r(t,n,e)/I)*I,Math.round(f(t,n,e)/I)*I];return i.index=n,i.data=t,i}),u)}var r=n,f=i,u=null;return e.polygons=function(t){return e(t).polygons()},e.links=function(t){return e(t).links()},e.triangles=function(t){return e(t).triangles()},e.x=function(n){return arguments.length?(r="function"==typeof n?n:t(+n),e):r},e.y=function(n){return arguments.length?(f="function"==typeof n?n:t(+n),e):f},e.extent=function(t){return arguments.length?(u=null==t?null:[[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]],e):u&&[[u[0][0],u[0][1]],[u[1][0],u[1][1]]]},e.size=function(t){return arguments.length?(u=null==t?null:[[0,0],[+t[0],+t[1]]],e):u&&[u[1][0]-u[0][0],u[1][1]-u[0][1]]},e}r.prototype={constructor:r,insert:function(e,t){var n,i,r;if(e){if(t.P=e,t.N=e.N,e.N&&(e.N.P=t),e.N=t,e.R){for(e=e.R;e.L;)e=e.L;e.L=t}else e.R=t;n=e}else this._?(e=l(this._),t.P=null,t.N=e,e.P=e.L=t,n=e):(t.P=t.N=null,this._=t,n=null);for(t.L=t.R=null,t.U=n,t.C=!0,e=t;n&&n.C;)i=n.U,n===i.L?(r=i.R,r&&r.C?(n.C=r.C=!1,i.C=!0,e=i):(e===n.R&&(u(this,n),e=n,n=e.U),n.C=!1,i.C=!0,s(this,i))):(r=i.L,r&&r.C?(n.C=r.C=!1,i.C=!0,e=i):(e===n.L&&(s(this,n),e=n,n=e.U),n.C=!1,i.C=!0,u(this,i))),n=e.U;this._.C=!1},remove:function(e){e.N&&(e.N.P=e.P),e.P&&(e.P.N=e.N),e.N=e.P=null;var t,n,i,r=e.U,f=e.L,a=e.R;if(n=f?a?l(a):f:a,r?r.L===e?r.L=n:r.R=n:this._=n,f&&a?(i=n.C,n.C=e.C,n.L=f,f.U=n,n!==a?(r=n.U,n.U=e.U,e=n.R,r.L=e,n.R=a,a.U=n):(n.U=r,r=n,e=n.R)):(i=e.C,e=n),e&&(e.U=r),!i){if(e&&e.C)return void(e.C=!1);do{if(e===this._)break;if(e===r.L){if(t=r.R,t.C&&(t.C=!1,r.C=!0,u(this,r),t=r.R),t.L&&t.L.C||t.R&&t.R.C){t.R&&t.R.C||(t.L.C=!1,t.C=!0,s(this,t),t=r.R),t.C=r.C,r.C=t.R.C=!1,u(this,r),e=this._;break}}else if(t=r.L,t.C&&(t.C=!1,r.C=!0,s(this,r),t=r.L),t.L&&t.L.C||t.R&&t.R.C){t.L&&t.L.C||(t.R.C=!1,t.C=!0,u(this,t),t=r.L),t.C=r.C,r.C=t.L.C=!1,s(this,r),e=this._;break}t.C=!0,e=r,r=r.U}while(!e.C);e&&(e.C=!1)}}};var z,O,B,D,F,G=[],H=[],I=1e-6,J=1e-12;q.prototype={constructor:q,polygons:function(){var e=this.edges;return this.cells.map(function(t){var n=t.halfedges.map(function(n){return p(t,e[n])});return n.data=t.site.data,n})},triangles:function(){var e=[],t=this.edges;return this.cells.forEach(function(n,i){for(var r,f=n.site,u=n.halfedges,s=-1,l=u.length,a=t[u[l-1]],o=a.left===f?a.right:a.left;++s<l;)r=o,a=t[u[s]],o=a.left===f?a.right:a.left,i<r.index&&i<o.index&&A(f,r,o)<0&&e.push([f.data,r.data,o.data])}),e},links:function(){return this.edges.filter(function(e){return e.right}).map(function(e){return{source:e.left.data,target:e.right.data}})},_found:0,find:function(e,t,n){var i,r=this,f=r._found,u=r.cells[f]||r.cells[f=0],s=e-u.site[0],l=t-u.site[1],a=s*s+l*l;do u=r.cells[i=f],f=null,u.halfedges.forEach(function(n){var i=r.edges[n],s=i.left;if(s!==u.site&&s||(s=i.right),s){var l=e-s[0],o=t-s[1],h=l*l+o*o;if(h<a)return a=h,void(f=s.index)}});while(null!==f);return r._found=i,!n||a<n*n?u.site:null}},e.voronoi=E,Object.defineProperty(e,"__esModule",{value:!0})});

var countries = [
    {
      "Country": "Afghanistan",
      "CountryCode": "AFG",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 15936784437.22,
      "GDP_perCapita": 561.2,
      "lifeExpectancy": 59.60009756
    },
    {
      "Country": "Albania",
      "CountryCode": "ALB",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 11926957254.63,
      "GDP_perCapita": 4094.36,
      "lifeExpectancy": 76.9785122
    },
    {
      "Country": "Algeria",
      "CountryCode": "DZA",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 161207304960.46,
      "GDP_perCapita": 4349.57,
      "lifeExpectancy": 70.61660976
    },
    {
      "Country": "Angola",
      "CountryCode": "AGO",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 82470894868.33,
      "GDP_perCapita": 4218.65,
      "lifeExpectancy": 50.65417073
    },
    {
      "Country": "Antigua and Barbuda",
      "CountryCode": "ATG",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 1135539037.04,
      "GDP_perCapita": 13017.31,
      "lifeExpectancy": 75.33390244
    },
    {
      "Country": "Argentina",
      "CountryCode": "ARG",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 462703793707.19,
      "GDP_perCapita": 11460.38,
      "lifeExpectancy": 75.66356098
    },
    {
      "Country": "Armenia",
      "CountryCode": "ARM",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 9260287416.06,
      "GDP_perCapita": 3124.78,
      "lifeExpectancy": 74.21965854
    },
    {
      "Country": "Aruba",
      "CountryCode": "ABW",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 2467703910.61,
      "GDP_perCapita": 24289.14,
      "lifeExpectancy": 74.95202439
    },
    {
      "Country": "Australia",
      "CountryCode": "AUS",
      "Region": "Oceania",
      "Continent": "Oceania",
      "GDP": 1141267760188.09,
      "GDP_perCapita": 51800.93,
      "lifeExpectancy": 81.69512195
    },
    {
      "Country": "Austria",
      "CountryCode": "AUT",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 389656071767.18,
      "GDP_perCapita": 46590.61,
      "lifeExpectancy": 80.5804878
    },
    {
      "Country": "Azerbaijan",
      "CountryCode": "AZE",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 52902703376.11,
      "GDP_perCapita": 5842.81,
      "lifeExpectancy": 70.45029268
    },
    {
      "Country": "Bahamas, The",
      "CountryCode": "BHS",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 7.91e+09,
      "GDP_perCapita": 21941.87,
      "lifeExpectancy": 74.59239024
    },
    {
      "Country": "Bahrain",
      "CountryCode": "BHR",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 25713544824.94,
      "GDP_perCapita": 20545.97,
      "lifeExpectancy": 76.26485366
    },
    {
      "Country": "Bangladesh",
      "CountryCode": "BGD",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 115279077465.23,
      "GDP_perCapita": 762.8,
      "lifeExpectancy": 69.48580488
    },
    {
      "Country": "Barbados",
      "CountryCode": "BRB",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 4433700000,
      "GDP_perCapita": 15812.28,
      "lifeExpectancy": 74.80178049
    },
    {
      "Country": "Belarus",
      "CountryCode": "BLR",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 55220932613.96,
      "GDP_perCapita": 5818.85,
      "lifeExpectancy": 70.40487805
    },
    {
      "Country": "Belgium",
      "CountryCode": "BEL",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 484404271608.09,
      "GDP_perCapita": 44358.26,
      "lifeExpectancy": 80.23414634
    },
    {
      "Country": "Belize",
      "CountryCode": "BLZ",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 1397113450,
      "GDP_perCapita": 4527.34,
      "lifeExpectancy": 73.2704878
    },
    {
      "Country": "Benin",
      "CountryCode": "BEN",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 6561782312.62,
      "GDP_perCapita": 690,
      "lifeExpectancy": 58.74668293
    },
    {
      "Country": "Bermuda",
      "CountryCode": "BMU",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 5744414000,
      "GDP_perCapita": 88207.33,
      "lifeExpectancy": 79.28853659
    },
    {
      "Country": "Bhutan",
      "CountryCode": "BTN",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 1585396256.12,
      "GDP_perCapita": 2211.34,
      "lifeExpectancy": 67.00468293
    },
    {
      "Country": "Bolivia",
      "CountryCode": "BOL",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 19649631308.16,
      "GDP_perCapita": 1934.67,
      "lifeExpectancy": 66.31970732
    },
    {
      "Country": "Bosnia and Herzegovina",
      "CountryCode": "BIH",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 16847493058.85,
      "GDP_perCapita": 4380.6,
      "lifeExpectancy": 75.80668293
    },
    {
      "Country": "Botswana",
      "CountryCode": "BWA",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 13746712711.21,
      "GDP_perCapita": 6980.36,
      "lifeExpectancy": 46.44029268
    },
    {
      "Country": "Brazil",
      "CountryCode": "BRA",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 2143067871759.89,
      "GDP_perCapita": 10978.26,
      "lifeExpectancy": 73.07531707
    },
    {
      "Country": "Brunei Darussalam",
      "CountryCode": "BRN",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 12369708858.9,
      "GDP_perCapita": 30880.34,
      "lifeExpectancy": 77.98865854
    },
    {
      "Country": "Bulgaria",
      "CountryCode": "BGR",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 48669060511.71,
      "GDP_perCapita": 6580.81,
      "lifeExpectancy": 73.51219512
    },
    {
      "Country": "Burkina Faso",
      "CountryCode": "BFA",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 8992678844.36,
      "GDP_perCapita": 578.67,
      "lifeExpectancy": 55.0067561
    },
    {
      "Country": "Burundi",
      "CountryCode": "BDI",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 2026864414.47,
      "GDP_perCapita": 219.53,
      "lifeExpectancy": 52.62402439
    },
    {
      "Country": "Cabo Verde",
      "CountryCode": "CPV",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 1664310632.51,
      "GDP_perCapita": 3413.26,
      "lifeExpectancy": 73.85697561
    },
    {
      "Country": "Cambodia",
      "CountryCode": "KHM",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 11242266333.93,
      "GDP_perCapita": 782.62,
      "lifeExpectancy": 70.64336585
    },
    {
      "Country": "Cameroon",
      "CountryCode": "CMR",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 23622482954.8,
      "GDP_perCapita": 1145.37,
      "lifeExpectancy": 53.69482927
    },
    {
      "Country": "Canada",
      "CountryCode": "CAN",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 1614072093764.07,
      "GDP_perCapita": 47465.35,
      "lifeExpectancy": 80.8934878
    },
    {
      "Country": "Central African Republic",
      "CountryCode": "CAF",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 1986014759.2,
      "GDP_perCapita": 456.56,
      "lifeExpectancy": 48.09873171
    },
    {
      "Country": "Chad",
      "CountryCode": "TCD",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 10657705536.5,
      "GDP_perCapita": 909.3,
      "lifeExpectancy": 49.76985366
    },
    {
      "Country": "Chile",
      "CountryCode": "CHL",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 217501911333.71,
      "GDP_perCapita": 12681.77,
      "lifeExpectancy": 79.05046341
    },
    {
      "Country": "China",
      "CountryCode": "CHN",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 5930502270312.98,
      "GDP_perCapita": 4433.34,
      "lifeExpectancy": 74.88502439
    },
    {
      "Country": "Colombia",
      "CountryCode": "COL",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 287018184637.53,
      "GDP_perCapita": 6179.77,
      "lifeExpectancy": 73.36768293
    },
    {
      "Country": "Comoros",
      "CountryCode": "COM",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 516962949.5,
      "GDP_perCapita": 756.81,
      "lifeExpectancy": 60.20341463
    },
    {
      "Country": "Congo, Rep.",
      "CountryCode": "COG",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 12007880067.44,
      "GDP_perCapita": 2920.41,
      "lifeExpectancy": 57.20402439
    },
    {
      "Country": "Costa Rica",
      "CountryCode": "CRI",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 36298327669.9,
      "GDP_perCapita": 7773.19,
      "lifeExpectancy": 79.27970732
    },
    {
      "Country": "Cote d'Ivoire",
      "CountryCode": "CIV",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 24884503950.68,
      "GDP_perCapita": 1311.33,
      "lifeExpectancy": 49.67529268
    },
    {
      "Country": "Croatia",
      "CountryCode": "HRV",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 59643818181.82,
      "GDP_perCapita": 13500.85,
      "lifeExpectancy": 76.47560976
    },
    {
      "Country": "Cuba",
      "CountryCode": "CUB",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 64328220000,
      "GDP_perCapita": 5701.96,
      "lifeExpectancy": 78.71778049
    },
    {
      "Country": "Cyprus",
      "CountryCode": "CYP",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 23132450331.13,
      "GDP_perCapita": 27889.04,
      "lifeExpectancy": 79.30982927
    },
    {
      "Country": "Czech Republic",
      "CountryCode": "CZE",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 207016402026.36,
      "GDP_perCapita": 19764.02,
      "lifeExpectancy": 77.42439024
    },
    {
      "Country": "Denmark",
      "CountryCode": "DNK",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 319812413596.9,
      "GDP_perCapita": 57647.93,
      "lifeExpectancy": 79.1
    },
    {
      "Country": "Djibouti",
      "CountryCode": "DJI",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 1128611700.36,
      "GDP_perCapita": 1353.19,
      "lifeExpectancy": 60.29119512
    },
    {
      "Country": "Dominican Republic",
      "CountryCode": "DOM",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 53042943731.14,
      "GDP_perCapita": 5295.4,
      "lifeExpectancy": 72.79214634
    },
    {
      "Country": "Ecuador",
      "CountryCode": "ECU",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 69555367000,
      "GDP_perCapita": 4636.69,
      "lifeExpectancy": 75.64770732
    },
    {
      "Country": "Egypt, Arab Rep.",
      "CountryCode": "EGY",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 218887812549.85,
      "GDP_perCapita": 2803.53,
      "lifeExpectancy": 70.45082927
    },
    {
      "Country": "El Salvador",
      "CountryCode": "SLV",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 21418300000,
      "GDP_perCapita": 3444.46,
      "lifeExpectancy": 71.63441463
    },
    {
      "Country": "Equatorial Guinea",
      "CountryCode": "GNQ",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 11582917790.3,
      "GDP_perCapita": 16638.13,
      "lifeExpectancy": 51.53307317
    },
    {
      "Country": "Eritrea",
      "CountryCode": "ERI",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 2117039510.7,
      "GDP_perCapita": 368.75,
      "lifeExpectancy": 61.18509756
    },
    {
      "Country": "Estonia",
      "CountryCode": "EST",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 19479012423.35,
      "GDP_perCapita": 14629.65,
      "lifeExpectancy": 75.42926829
    },
    {
      "Country": "Ethiopia",
      "CountryCode": "ETH",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 29933790334.34,
      "GDP_perCapita": 343.69,
      "lifeExpectancy": 61.46795122
    },
    {
      "Country": "Fiji",
      "CountryCode": "FJI",
      "Region": "Oceania",
      "Continent": "Oceania",
      "GDP": 3140508835.95,
      "GDP_perCapita": 3649.38,
      "lifeExpectancy": 69.38231707
    },
    {
      "Country": "Finland",
      "CountryCode": "FIN",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 247799815768.48,
      "GDP_perCapita": 46202.42,
      "lifeExpectancy": 79.87073171
    },
    {
      "Country": "France",
      "CountryCode": "FRA",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 2646837111794.78,
      "GDP_perCapita": 40706.08,
      "lifeExpectancy": 81.66341463
    },
    {
      "Country": "Gabon",
      "CountryCode": "GAB",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 14569527124.62,
      "GDP_perCapita": 9362.11,
      "lifeExpectancy": 62.2897561
    },
    {
      "Country": "Gambia, The",
      "CountryCode": "GMB",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 951827284.92,
      "GDP_perCapita": 566.35,
      "lifeExpectancy": 58.1335122
    },
    {
      "Country": "Georgia",
      "CountryCode": "GEO",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 11638536834.43,
      "GDP_perCapita": 2613.76,
      "lifeExpectancy": 73.67473171
    },
    {
      "Country": "Germany",
      "CountryCode": "DEU",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 3412008772736.86,
      "GDP_perCapita": 41723.37,
      "lifeExpectancy": 79.98780488
    },
    {
      "Country": "Ghana",
      "CountryCode": "GHA",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 32174839712.79,
      "GDP_perCapita": 1326.09,
      "lifeExpectancy": 60.59956098
    },
    {
      "Country": "Greece",
      "CountryCode": "GRC",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 299598056253.27,
      "GDP_perCapita": 26861.46,
      "lifeExpectancy": 80.38780488
    },
    {
      "Country": "Grenada",
      "CountryCode": "GRD",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 771015875.27,
      "GDP_perCapita": 7365.67,
      "lifeExpectancy": 72.33687805
    },
    {
      "Country": "Guatemala",
      "CountryCode": "GTM",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 41337958251.63,
      "GDP_perCapita": 2882.39,
      "lifeExpectancy": 70.99597561
    },
    {
      "Country": "Guinea",
      "CountryCode": "GIN",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 4735956475.83,
      "GDP_perCapita": 435.45,
      "lifeExpectancy": 55.298
    },
    {
      "Country": "Guinea-Bissau",
      "CountryCode": "GNB",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 847491366.89,
      "GDP_perCapita": 534.15,
      "lifeExpectancy": 53.55843902
    },
    {
      "Country": "Guyana",
      "CountryCode": "GUY",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 2259288396.24,
      "GDP_perCapita": 2873.95,
      "lifeExpectancy": 65.7024878
    },
    {
      "Country": "Haiti",
      "CountryCode": "HTI",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 6622541528.57,
      "GDP_perCapita": 669.19,
      "lifeExpectancy": 61.8667561
    },
    {
      "Country": "Honduras",
      "CountryCode": "HND",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 15839344591.98,
      "GDP_perCapita": 2078.33,
      "lifeExpectancy": 72.85031707
    },
    {
      "Country": "Hong Kong SAR, China",
      "CountryCode": "HKG",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 228637697575.04,
      "GDP_perCapita": 32550,
      "lifeExpectancy": 82.97804878
    },
    {
      "Country": "Hungary",
      "CountryCode": "HUN",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 129585601615.85,
      "GDP_perCapita": 12958.53,
      "lifeExpectancy": 74.20731707
    },
    {
      "Country": "Iceland",
      "CountryCode": "ISL",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 13261035516.56,
      "GDP_perCapita": 41695.99,
      "lifeExpectancy": 81.89756098
    },
    {
      "Country": "India",
      "CountryCode": "IND",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 1708458876829.92,
      "GDP_perCapita": 1417.07,
      "lifeExpectancy": 65.6942439
    },
    {
      "Country": "Indonesia",
      "CountryCode": "IDN",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 709190823319.75,
      "GDP_perCapita": 2946.66,
      "lifeExpectancy": 70.16785366
    },
    {
      "Country": "Iran, Islamic Rep.",
      "CountryCode": "IRN",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 422567967404.51,
      "GDP_perCapita": 5674.92,
      "lifeExpectancy": 73.13014634
    },
    {
      "Country": "Iraq",
      "CountryCode": "IRQ",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 138516722649.57,
      "GDP_perCapita": 4473.71,
      "lifeExpectancy": 68.8297561
    },
    {
      "Country": "Ireland",
      "CountryCode": "IRL",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 218435251789.12,
      "GDP_perCapita": 47900.84,
      "lifeExpectancy": 80.74390244
    },
    {
      "Country": "Israel",
      "CountryCode": "ISR",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 232907996790.59,
      "GDP_perCapita": 30550.92,
      "lifeExpectancy": 81.60243902
    },
    {
      "Country": "Italy",
      "CountryCode": "ITA",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 2126620402889.09,
      "GDP_perCapita": 35875.73,
      "lifeExpectancy": 82.03658537
    },
    {
      "Country": "Jamaica",
      "CountryCode": "JAM",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 13230844040.04,
      "GDP_perCapita": 4917.02,
      "lifeExpectancy": 72.84712195
    },
    {
      "Country": "Japan",
      "CountryCode": "JPN",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 5495387182996.1,
      "GDP_perCapita": 42909.25,
      "lifeExpectancy": 82.84268293
    },
    {
      "Country": "Jordan",
      "CountryCode": "JOR",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 26425379436.62,
      "GDP_perCapita": 4370.72,
      "lifeExpectancy": 73.43587805
    },
    {
      "Country": "Kazakhstan",
      "CountryCode": "KAZ",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 148047348240.64,
      "GDP_perCapita": 9070.65,
      "lifeExpectancy": 68.29536585
    },
    {
      "Country": "Kenya",
      "CountryCode": "KEN",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 40000138830.87,
      "GDP_perCapita": 977.78,
      "lifeExpectancy": 59.54707317
    },
    {
      "Country": "Kiribati",
      "CountryCode": "KIR",
      "Region": "Oceania",
      "Continent": "Oceania",
      "GDP": 150431113.56,
      "GDP_perCapita": 1539.05,
      "lifeExpectancy": 67.88382927
    },
    {
      "Country": "Korea, Rep.",
      "CountryCode": "KOR",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 1094499350178.46,
      "GDP_perCapita": 22151.21,
      "lifeExpectancy": 80.55121951
    },
    {
      "Country": "Kuwait",
      "CountryCode": "KWT",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 115428557470.18,
      "GDP_perCapita": 38584.48,
      "lifeExpectancy": 74.16192683
    },
    {
      "Country": "Kyrgyz Republic",
      "CountryCode": "KGZ",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 4794357795.07,
      "GDP_perCapita": 880.04,
      "lifeExpectancy": 69.3
    },
    {
      "Country": "Lao PDR",
      "CountryCode": "LAO",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 7181441151.89,
      "GDP_perCapita": 1122.85,
      "lifeExpectancy": 66.89843902
    },
    {
      "Country": "Latvia",
      "CountryCode": "LVA",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 24009680459.99,
      "GDP_perCapita": 11446.51,
      "lifeExpectancy": 73.48292683
    },
    {
      "Country": "Lebanon",
      "CountryCode": "LBN",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 38009950248.76,
      "GDP_perCapita": 8755.85,
      "lifeExpectancy": 79.25278049
    },
    {
      "Country": "Lesotho",
      "CountryCode": "LSO",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 2175692207.16,
      "GDP_perCapita": 1083.02,
      "lifeExpectancy": 47.48341463
    },
    {
      "Country": "Liberia",
      "CountryCode": "LBR",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 1292696475.96,
      "GDP_perCapita": 326.6,
      "lifeExpectancy": 59.43431707
    },
    {
      "Country": "Libya",
      "CountryCode": "LBY",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 74755288916.96,
      "GDP_perCapita": 12375.45,
      "lifeExpectancy": 74.7924878
    },
    {
      "Country": "Lithuania",
      "CountryCode": "LTU",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 36709511568.12,
      "GDP_perCapita": 11852.17,
      "lifeExpectancy": 73.26829268
    },
    {
      "Country": "Luxembourg",
      "CountryCode": "LUX",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 52143650382.99,
      "GDP_perCapita": 102856.97,
      "lifeExpectancy": 80.63170732
    },
    {
      "Country": "Macao SAR, China",
      "CountryCode": "MAC",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 28359706123.1,
      "GDP_perCapita": 53045.88,
      "lifeExpectancy": 79.69295122
    },
    {
      "Country": "Macedonia, FYR",
      "CountryCode": "MKD",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 9338674078.31,
      "GDP_perCapita": 4442.3,
      "lifeExpectancy": 74.72214634
    },
    {
      "Country": "Madagascar",
      "CountryCode": "MDG",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 8729936135.74,
      "GDP_perCapita": 414.14,
      "lifeExpectancy": 63.34973171
    },
    {
      "Country": "Malawi",
      "CountryCode": "MWI",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 5398616984.59,
      "GDP_perCapita": 359.58,
      "lifeExpectancy": 53.46570732
    },
    {
      "Country": "Malaysia",
      "CountryCode": "MYS",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 247533525517.7,
      "GDP_perCapita": 8754.24,
      "lifeExpectancy": 74.49558537
    },
    {
      "Country": "Maldives",
      "CountryCode": "MDV",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 2134104883.7,
      "GDP_perCapita": 6552.48,
      "lifeExpectancy": 76.78631707
    },
    {
      "Country": "Mali",
      "CountryCode": "MLI",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 9422267259.99,
      "GDP_perCapita": 673.69,
      "lifeExpectancy": 53.77073171
    },
    {
      "Country": "Malta",
      "CountryCode": "MLT",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 8163841059.6,
      "GDP_perCapita": 19695.26,
      "lifeExpectancy": 81.39756098
    },
    {
      "Country": "Mauritania",
      "CountryCode": "MRT",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 3526947608.88,
      "GDP_perCapita": 977.15,
      "lifeExpectancy": 61.0232439
    },
    {
      "Country": "Mauritius",
      "CountryCode": "MUS",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 9718233910.68,
      "GDP_perCapita": 7772.1,
      "lifeExpectancy": 72.96731707
    },
    {
      "Country": "Mexico",
      "CountryCode": "MEX",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 1051627949327,
      "GDP_perCapita": 8920.69,
      "lifeExpectancy": 76.69029268
    },
    {
      "Country": "Micronesia, Fed. Sts.",
      "CountryCode": "FSM",
      "Region": "Oceania",
      "Continent": "Oceania",
      "GDP": 294117200,
      "GDP_perCapita": 2838.45,
      "lifeExpectancy": 68.62173171
    },
    {
      "Country": "Moldova",
      "CountryCode": "MDA",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 5811604051.97,
      "GDP_perCapita": 1631.54,
      "lifeExpectancy": 68.45812195
    },
    {
      "Country": "Mongolia",
      "CountryCode": "MNG",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 6200357070.11,
      "GDP_perCapita": 2285.65,
      "lifeExpectancy": 66.89460976
    },
    {
      "Country": "Montenegro",
      "CountryCode": "MNE",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 4114881346.94,
      "GDP_perCapita": 6636.07,
      "lifeExpectancy": 74.41673171
    },
    {
      "Country": "Morocco",
      "CountryCode": "MAR",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 90770671431.67,
      "GDP_perCapita": 2822.73,
      "lifeExpectancy": 70.17158537
    },
    {
      "Country": "Mozambique",
      "CountryCode": "MOZ",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 10165353591.17,
      "GDP_perCapita": 424.13,
      "lifeExpectancy": 49.13707317
    },
    {
      "Country": "Namibia",
      "CountryCode": "NAM",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 11281996426.04,
      "GDP_perCapita": 5177.68,
      "lifeExpectancy": 62.48029268
    },
    {
      "Country": "Nepal",
      "CountryCode": "NPL",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 15994094606.97,
      "GDP_perCapita": 595.77,
      "lifeExpectancy": 67.10492683
    },
    {
      "Country": "Netherlands",
      "CountryCode": "NLD",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 836389937229.2,
      "GDP_perCapita": 50338.25,
      "lifeExpectancy": 80.70243902
    },
    {
      "Country": "New Zealand",
      "CountryCode": "NZL",
      "Region": "Oceania",
      "Continent": "Oceania",
      "GDP": 143466743661.01,
      "GDP_perCapita": 32975.55,
      "lifeExpectancy": 80.70243902
    },
    {
      "Country": "Nicaragua",
      "CountryCode": "NIC",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 8938209651.44,
      "GDP_perCapita": 1535.19,
      "lifeExpectancy": 73.79512195
    },
    {
      "Country": "Niger",
      "CountryCode": "NER",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 5718589550.16,
      "GDP_perCapita": 359.8,
      "lifeExpectancy": 56.98563415
    },
    {
      "Country": "Nigeria",
      "CountryCode": "NGA",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 369062403181.95,
      "GDP_perCapita": 2310.86,
      "lifeExpectancy": 51.28941463
    },
    {
      "Country": "Norway",
      "CountryCode": "NOR",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 420945705225.42,
      "GDP_perCapita": 86096.14,
      "lifeExpectancy": 80.99756098
    },
    {
      "Country": "Oman",
      "CountryCode": "OMN",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 58641352878.43,
      "GDP_perCapita": 20922.66,
      "lifeExpectancy": 76.04580488
    },
    {
      "Country": "Pakistan",
      "CountryCode": "PAK",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 177165635077.07,
      "GDP_perCapita": 1023.2,
      "lifeExpectancy": 66.12634146
    },
    {
      "Country": "Panama",
      "CountryCode": "PAN",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 28814100000,
      "GDP_perCapita": 7833.9,
      "lifeExpectancy": 76.94870732
    },
    {
      "Country": "Papua New Guinea",
      "CountryCode": "PNG",
      "Region": "Oceania",
      "Continent": "Oceania",
      "GDP": 9717175432.14,
      "GDP_perCapita": 1416.72,
      "lifeExpectancy": 62.00780488
    },
    {
      "Country": "Paraguay",
      "CountryCode": "PRY",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 20030529733.44,
      "GDP_perCapita": 3100.84,
      "lifeExpectancy": 72.02665854
    },
    {
      "Country": "Peru",
      "CountryCode": "PER",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 148522810971.5,
      "GDP_perCapita": 5075.48,
      "lifeExpectancy": 73.90509756
    },
    {
      "Country": "Philippines",
      "CountryCode": "PHL",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 199589447424.07,
      "GDP_perCapita": 2135.92,
      "lifeExpectancy": 68.23026829
    },
    {
      "Country": "Poland",
      "CountryCode": "POL",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 476687891752.07,
      "GDP_perCapita": 12484.07,
      "lifeExpectancy": 76.24634146
    },
    {
      "Country": "Portugal",
      "CountryCode": "PRT",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 238303443425.21,
      "GDP_perCapita": 22538.65,
      "lifeExpectancy": 79.02682927
    },
    {
      "Country": "Qatar",
      "CountryCode": "QAT",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 125122249141.25,
      "GDP_perCapita": 71510.16,
      "lifeExpectancy": 78.14604878
    },
    {
      "Country": "Russian Federation",
      "CountryCode": "RUS",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 1524916112078.87,
      "GDP_perCapita": 10709.77,
      "lifeExpectancy": 68.85609756
    },
    {
      "Country": "Rwanda",
      "CountryCode": "RWA",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 5698548923.48,
      "GDP_perCapita": 525.85,
      "lifeExpectancy": 62.21214634
    },
    {
      "Country": "Samoa",
      "CountryCode": "WSM",
      "Region": "Oceania",
      "Continent": "Oceania",
      "GDP": 643059403.01,
      "GDP_perCapita": 3456.77,
      "lifeExpectancy": 72.40802439
    },
    {
      "Country": "Sao Tome and Principe",
      "CountryCode": "STP",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 201037916.58,
      "GDP_perCapita": 1127.98,
      "lifeExpectancy": 65.85368293
    },
    {
      "Country": "Saudi Arabia",
      "CountryCode": "SAU",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 526811466666.67,
      "GDP_perCapita": 19326.58,
      "lifeExpectancy": 75.07560976
    },
    {
      "Country": "Senegal",
      "CountryCode": "SEN",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 12932427724.32,
      "GDP_perCapita": 998.6,
      "lifeExpectancy": 62.84187805
    },
    {
      "Country": "Serbia",
      "CountryCode": "SRB",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 39368633038.12,
      "GDP_perCapita": 5399.3,
      "lifeExpectancy": 74.33658537
    },
    {
      "Country": "Seychelles",
      "CountryCode": "SYC",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 973360306.52,
      "GDP_perCapita": 10842.82,
      "lifeExpectancy": 73.19756098
    },
    {
      "Country": "Sierra Leone",
      "CountryCode": "SLE",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 2578159495.56,
      "GDP_perCapita": 448.22,
      "lifeExpectancy": 44.83895122
    },
    {
      "Country": "Singapore",
      "CountryCode": "SGP",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 236420337242.78,
      "GDP_perCapita": 46569.69,
      "lifeExpectancy": 81.54146341
    },
    {
      "Country": "Slovak Republic",
      "CountryCode": "SVK",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 89011919205.3,
      "GDP_perCapita": 16509.9,
      "lifeExpectancy": 75.11219512
    },
    {
      "Country": "Slovenia",
      "CountryCode": "SVN",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 47972988741.72,
      "GDP_perCapita": 23417.64,
      "lifeExpectancy": 79.42195122
    },
    {
      "Country": "Solomon Islands",
      "CountryCode": "SLB",
      "Region": "Oceania",
      "Continent": "Oceania",
      "GDP": 681587104.77,
      "GDP_perCapita": 1294.69,
      "lifeExpectancy": 67.06665854
    },
    {
      "Country": "South Africa",
      "CountryCode": "ZAF",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 375349442837.19,
      "GDP_perCapita": 7389.96,
      "lifeExpectancy": 54.3907561
    },
    {
      "Country": "Spain",
      "CountryCode": "ESP",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 1431587612302.26,
      "GDP_perCapita": 30736,
      "lifeExpectancy": 81.62682927
    },
    {
      "Country": "Sri Lanka",
      "CountryCode": "LKA",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 49567521669.91,
      "GDP_perCapita": 2400.02,
      "lifeExpectancy": 73.75526829
    },
    {
      "Country": "St. Lucia",
      "CountryCode": "LCA",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 1244297407.41,
      "GDP_perCapita": 7014.2,
      "lifeExpectancy": 74.41102439
    },
    {
      "Country": "St. Vincent and the Grenadines",
      "CountryCode": "VCT",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 681225962.96,
      "GDP_perCapita": 6231.71,
      "lifeExpectancy": 72.18492683
    },
    {
      "Country": "Sudan",
      "CountryCode": "SDN",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 65632081240.3,
      "GDP_perCapita": 1439.52,
      "lifeExpectancy": 61.47829268
    },
    {
      "Country": "Suriname",
      "CountryCode": "SUR",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 4368398047.64,
      "GDP_perCapita": 8321.39,
      "lifeExpectancy": 70.33582927
    },
    {
      "Country": "Swaziland",
      "CountryCode": "SWZ",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 3891575151.61,
      "GDP_perCapita": 3261.6,
      "lifeExpectancy": 48.3457561
    },
    {
      "Country": "Sweden",
      "CountryCode": "SWE",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 488377689564.92,
      "GDP_perCapita": 52076.26,
      "lifeExpectancy": 81.45121951
    },
    {
      "Country": "Switzerland",
      "CountryCode": "CHE",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 581208562423.37,
      "GDP_perCapita": 74276.72,
      "lifeExpectancy": 82.24634146
    },
    {
      "Country": "Tajikistan",
      "CountryCode": "TJK",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 5642178579.58,
      "GDP_perCapita": 739.73,
      "lifeExpectancy": 66.9955122
    },
    {
      "Country": "Tanzania",
      "CountryCode": "TZA",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 30917376837.12,
      "GDP_perCapita": 707.93,
      "lifeExpectancy": 59.18170732
    },
    {
      "Country": "Thailand",
      "CountryCode": "THA",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 318907930075.71,
      "GDP_perCapita": 4802.66,
      "lifeExpectancy": 73.81378049
    },
    {
      "Country": "Togo",
      "CountryCode": "TGO",
      "Region": "Africa | South & West",
      "Continent": "Africa",
      "GDP": 3172945506.36,
      "GDP_perCapita": 503.16,
      "lifeExpectancy": 55.46887805
    },
    {
      "Country": "Tonga",
      "CountryCode": "TON",
      "Region": "Oceania",
      "Continent": "Oceania",
      "GDP": 369212477.46,
      "GDP_perCapita": 3546.78,
      "lifeExpectancy": 72.18263415
    },
    {
      "Country": "Trinidad and Tobago",
      "CountryCode": "TTO",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 20758191857.98,
      "GDP_perCapita": 15630.05,
      "lifeExpectancy": 69.59736585
    },
    {
      "Country": "Tunisia",
      "CountryCode": "TUN",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 44426016487.36,
      "GDP_perCapita": 4212.15,
      "lifeExpectancy": 74.60243902
    },
    {
      "Country": "Turkey",
      "CountryCode": "TUR",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 731168051903.11,
      "GDP_perCapita": 10135.75,
      "lifeExpectancy": 74.21119512
    },
    {
      "Country": "Turkmenistan",
      "CountryCode": "TKM",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 22148070175.44,
      "GDP_perCapita": 4392.72,
      "lifeExpectancy": 65.01821951
    },
    {
      "Country": "Uganda",
      "CountryCode": "UGA",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 18803852465.55,
      "GDP_perCapita": 553.26,
      "lifeExpectancy": 57.29653659
    },
    {
      "Country": "Ukraine",
      "CountryCode": "UKR",
      "Region": "Europe | South & East",
      "Continent": "Europe",
      "GDP": 136419300367.96,
      "GDP_perCapita": 2974,
      "lifeExpectancy": 70.26536585
    },
    {
      "Country": "United Arab Emirates",
      "CountryCode": "ARE",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 286049293398.98,
      "GDP_perCapita": 33885.93,
      "lifeExpectancy": 76.59860976
    },
    {
      "Country": "United Kingdom",
      "CountryCode": "GBR",
      "Region": "Europe | North & West",
      "Continent": "Europe",
      "GDP": 2407933767804.59,
      "GDP_perCapita": 38363.44,
      "lifeExpectancy": 80.40243902
    },
    {
      "Country": "United States",
      "CountryCode": "USA",
      "Region": "America | North & Central",
      "Continent": "Americas",
      "GDP": 1.49644e+13,
      "GDP_perCapita": 48377.39,
      "lifeExpectancy": 78.54146341
    },
    {
      "Country": "Uruguay",
      "CountryCode": "URY",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 38881102099.88,
      "GDP_perCapita": 11530.64,
      "lifeExpectancy": 76.61621951
    },
    {
      "Country": "Uzbekistan",
      "CountryCode": "UZB",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 39332770928.94,
      "GDP_perCapita": 1377.08,
      "lifeExpectancy": 67.8587561
    },
    {
      "Country": "Vanuatu",
      "CountryCode": "VUT",
      "Region": "Oceania",
      "Continent": "Oceania",
      "GDP": 700804286.22,
      "GDP_perCapita": 2965.75,
      "lifeExpectancy": 70.83890244
    },
    {
      "Country": "Venezuela, RB",
      "CountryCode": "VEN",
      "Region": "America | South",
      "Continent": "Americas",
      "GDP": 393801556872.31,
      "GDP_perCapita": 13559.13,
      "lifeExpectancy": 74.17046341
    },
    {
      "Country": "Vietnam",
      "CountryCode": "VNM",
      "Region": "Asia | East & Central",
      "Continent": "Asia",
      "GDP": 115931749904.86,
      "GDP_perCapita": 1333.58,
      "lifeExpectancy": 75.31173171
    },
    {
      "Country": "Yemen, Rep.",
      "CountryCode": "YEM",
      "Region": "Asia | South & West",
      "Continent": "Asia",
      "GDP": 31743751169.32,
      "GDP_perCapita": 1394.53,
      "lifeExpectancy": 62.52765854
    },
    {
      "Country": "Zambia",
      "CountryCode": "ZMB",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 20265396325.59,
      "GDP_perCapita": 1533.28,
      "lifeExpectancy": 54.52756098
    },
    {
      "Country": "Zimbabwe",
      "CountryCode": "ZWE",
      "Region": "Africa | North & East",
      "Continent": "Africa",
      "GDP": 9456808200,
      "GDP_perCapita": 723.16,
      "lifeExpectancy": 53.59312195
    }
  ];

//Scatterplot
var margin = {left: 60, top: 20, right: 20, bottom: 60},
	width = document.documentElement.clientWidth - margin.left - margin.right,
	height = document.documentElement.clientHeight-margin.bottom;

var svg = d3.select("#chart").append("svg")
			.attr("width", (width + margin.left + margin.right))
			.attr("height", (height + margin.top + margin.bottom));
			
var wrapper = svg.append("g").attr("class", "chordWrapper")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
var tooltip = d3.select("#chart")
    .append("div")
    .style("position", "absolute")
    .style("display", "inline-block")
    .style("visibility", "hidden")
    .style("color", "white") 
    .style("background-color", "#242625")
    .style("opacity", 0.8)
    .style("border-radius", "8px")
    .style("text-align", "center")
    .style("font-family", "Helvetica")
    .style("font-size", "12px")
    .style("width", "200px")
    .style("padding", "8px")
    .text("");

//////////////////////////////////////////////////////
///////////// Initialize Axes & Scales ///////////////
//////////////////////////////////////////////////////

var opacityCircles = 0.7,
	maxDistanceFromPoint = 50;

//Set the color for each region
var color = d3.scaleOrdinal()
					.range(["#EFB605", "#E58903", "#E01A25", "#C20049", "#991C71", "#66489F", "#2074A0", "#10A66E", "#7EB852"])
					.domain(["Africa | North & East", "Africa | South & West", "America | North & Central", "America | South", 
							 "Asia | East & Central", "Asia | South & West", "Europe | North & West", "Europe | South & East", "Oceania"]);
							 
//Set the new x axis range
var xScale = d3.scaleLog()
	.range([0, width])
	//.domain([100,2e5]); //I prefer this exact scale over the true range and then using "nice"
	.domain(d3.extent(countries, function(d) { return d.GDP_perCapita; }))
	.nice();
//Set new x-axis
var xAxis = d3.axisBottom()
	.ticks(2)
	.tickFormat(function (d) {
		return xScale.tickFormat((8),function(d) { 
			return d3.format('$.2s')(d);
		})(d);
	})	
	.scale(xScale);	
//Append the x-axis
wrapper.append("g")
	.attr("class", "x axis")
  .attr("transform", "translate(" + 0 + "," + height + ")")
  .style("stroke", "white")
	.call(xAxis);
		
//Set the new y axis range
var yScale = d3.scaleLinear()
	.range([height,0])
	.domain(d3.extent(countries, function(d) { return d.lifeExpectancy; }))
	.nice();	
var yAxis = d3.axisLeft()
	.ticks(6)  //Set rough # of ticks
	.scale(yScale);	
//Append the y-axis
wrapper.append("g")
		.attr("class", "y axis")
    .attr("transform", "translate(" + 0 + "," + 0 + ")")
    .style("stroke", "white")
		.call(yAxis);
		
//Scale for the bubble size
var rScale = d3.scaleSqrt()
			.range([2,16])
			.domain(d3.extent(countries, function(d) { return d.GDP; }));

//////////////////////////////////////////////////////
///////////////// Initialize Labels //////////////////
//////////////////////////////////////////////////////

//Set up X axis label
wrapper.append("g")
	.append("text")
	.attr("class", "x title")
	.attr("text-anchor", "end")
  .style("font-size", "12px")
  .style("stroke", "white")
	.attr("transform", "translate(" + width + "," + (height - 10) + ")")
	.text("GDP per capita [US $] - Note the logarithmic scale");

//Set up y axis label
wrapper.append("g")
	.append("text")
	.attr("class", "y title")
	.attr("text-anchor", "end")
  .style("font-size", "12px")
  .style("stroke", "white")
	.attr("transform", "translate(18, 0) rotate(-90)")
	.text("Life expectancy");

////////////////////////////////////////////////////////////	
///// Capture mouse events and voronoi.find() the site /////
////////////////////////////////////////////////////////////	

// Use the same variables of the data in the .x and .y as used in the cx and cy of the circle call
svg._tooltipped = svg._voronoi = null;
svg.on('mousemove', function() {
  if (!svg._voronoi) {
    console.log('computing the voronoi…');
    svg._voronoi = d3.voronoi()
	  .x(function(d) { return xScale(d.GDP_perCapita); })
	  .y(function(d) { return yScale(d.lifeExpectancy); })
    (countries);
    console.log('…done.');
  }
  var p = d3.mouse(this), site;
  p[0] -= margin.left;
  p[1] -= margin.top;
  // don't react if the mouse is close to one of the axis
  if (p[0] < 5 || p[1] < 5) {
    site = null;
  } else {
    site = svg._voronoi.find(p[0], p[1], maxDistanceFromPoint);
  }
  if (site !== svg._tooltipped) {
    if (svg._tooltipped) removeTooltip(svg._tooltipped.data)
    if (site) showTooltip(site.data);
    svg._tooltipped = site;
  }

});



////////////////////////////////////////////////////////////	
/////////////////// Scatterplot Circles ////////////////////
////////////////////////////////////////////////////////////	

//Initiate a group element for the circles	
var circleGroup = wrapper.append("g")
	.attr("class", "circleWrapper"); 
	
//Place the country circles
circleGroup.selectAll("countries")
	.data(countries.sort(function(a,b) { return b.GDP > a.GDP; })) //Sort so the biggest circles are below
	.enter().append("circle")
		.attr("class", function(d,i) { return "countries " + d.CountryCode; })
		.attr("cx", function(d) {return xScale(d.GDP_perCapita);})
		.attr("cy", function(d) {return yScale(d.lifeExpectancy);})
		.attr("r", function(d) {return rScale(d.GDP);})
		.style("opacity", opacityCircles)
    .style("fill", function(d) {return color(d.Region);})
    .on("mouseover", function(d){
     tooltip.html("<h3>" + d.Country + "</h3>");
     return tooltip.style("visibility", "visible")
    })
    .on("mousemove", function(){
    return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    })
    .on("mouseout", function(){
    return tooltip.style("visibility","hidden")
    })

    
			
///////////////////////////////////////////////////////////////////////////
///////////////////////// Create the Legend////////////////////////////////
///////////////////////////////////////////////////////////////////////////

	//Legend			
	var	legendMargin = {left: 5, top: 10, right: 5, bottom: 10},
		legendWidth = 145,
		legendHeight = 270;
		
	var svgLegend = d3.select("#legend").append("svg")
				.attr("width", (legendWidth + legendMargin.left + legendMargin.right))
				.attr("height", (legendHeight + legendMargin.top + legendMargin.bottom));			


//////////////////////////////////////////////////////
/////////////////// Bubble Legend ////////////////////
//////////////////////////////////////////////////////

function bubbleLegend(wrapperVar, scale, sizes, titleName) {

	var legendSize1 = sizes[0],
		legendSize2 = sizes[1],
		legendSize3 = sizes[2],
		legendCenter = 0,
		legendBottom = 50,
		legendLineLength = 25,
		textPadding = 5,
		numFormat = d3.format(",");
	
	wrapperVar.append("text")
		.attr("class","legendTitle")
		.attr("transform", "translate(" + legendCenter + "," + 0 + ")")
		.attr("x", 0 + "px")
		.attr("y", 0 + "px")
		.attr("dy", "1em")
		.text(titleName);
		
	wrapperVar.append("circle")
        .attr('r', scale(legendSize1))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize1)));
    wrapperVar.append("circle")
        .attr('r', scale(legendSize2))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize2)));
    wrapperVar.append("circle")
        .attr('r', scale(legendSize3))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize3)));
		
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize1)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize1)));	
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize2)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize2)));
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize3)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize3)));
		
	wrapperVar.append("text")
        .attr('class',"legendText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize1)))
		.attr('dy', '0.25em')
		.text("$ " + numFormat(Math.round(legendSize1/1e9)) + " B");
	wrapperVar.append("text")
        .attr('class',"legendText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize2)))
		.attr('dy', '0.25em')
		.text("$ " + numFormat(Math.round(legendSize2/1e9)) + " B");
	wrapperVar.append("text")
        .attr('class',"legendText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize3)))
		.attr('dy', '0.25em')
		.text("$ " + numFormat(Math.round(legendSize3/1e9)) + " B");
		
}//bubbleLegend



///////////////////////////////////////////////////////////////////////////
/////////////////// Hover functions of the circles ////////////////////////
///////////////////////////////////////////////////////////////////////////

//Hide the tooltip when the mouse moves away
function removeTooltip (d, i) {

	//Save the chosen circle (so not the voronoi)
	var element = d3.selectAll(".countries."+d.CountryCode);
		
	//Fade out the bubble again
	element.style("opacity", opacityCircles);
	
	//Hide tooltip
	d3.select('.popover').each(function() {
		d3.select(this).style("visibility", "hidden");
	}); 
  
	//Fade out guide lines, then remove them
	d3.selectAll(".guide")
		.transition().duration(100)
		.style("opacity",  0)
		.remove();
		
}//function removeTooltip

//Show the tooltip on the hovered over slice
function showTooltip (d, i) {
	console.log(d.Country)
	//Save the chosen circle (so not the voronoi)
	var element = d3.select(".countries."+d.CountryCode),
      el = element._groups[0];

  //Define and show the tooltip
  

  
	// $(el).popover({
	// 	placement: 'auto top',
	// 	container: '#chart',
	// 	trigger: 'manual',
	// 	html : true,
	// 	content: function() { 
	// 		return "<span style='font-size: 11px; text-align: center;'>" + d.Country + "</span>"; }
	// });
	// $(el).popover('show');

	//Make chosen circle more visible
	element.style("opacity", 1);

	//Place and show tooltip
	var x = +element.attr("cx"),
		y = +element.attr("cy"),
		color = element.style("fill");

	//Append lines to bubbles that will be used to show the precise data points
	
	//vertical line
	wrapper
		.append("line")
		.attr("class", "guide")
		.attr("x1", x)
		.attr("x2", x)
		.attr("y1", y)
		.attr("y2", height + 20)
		.style("stroke", color)
		.style("opacity",  0)
		.transition().duration(100)
		.style("opacity", 0.5);
	//Value on the axis
	wrapper
		.append("text")
		.attr("class", "guide")
		.attr("x", x)
		.attr("y", height + 38)
		.style("fill", color)
		.style("opacity",  0)
		.style("text-anchor", "middle")
		.text( "$ " + d3.format(".2s")(d.GDP_perCapita) )
		.transition().duration(100)
		.style("opacity", 0.5);

	//horizontal line
	wrapper
		.append("line")
		.attr("class", "guide")
		.attr("x1", x)
		.attr("x2", -20)
		.attr("y1", y)
		.attr("y2", y)
		.style("stroke", color)
		.style("opacity",  0)
		.transition().duration(100)
		.style("opacity", 0.5);
	//Value on the axis
	wrapper
		.append("text")
		.attr("class", "guide")
		.attr("x", -25)
		.attr("y", y)
		.attr("dy", "0.35em")
		.style("fill", color)
		.style("opacity",  0)
		.style("text-anchor", "end")
		.text( d3.format(".1f")(d.lifeExpectancy) )
		.transition().duration(100)
		.style("opacity", 0.5);	

}//function showTooltip


  }
}

</script>
<style scoped lang="scss">
.axis path,
		.axis line {
			fill: none;
			stroke: #B3B3B3;
			shape-rendering: crispEdges;
		}
		.axis text {
			font-size: 10px;
			fill: #6B6B6B;
		}

		.countries {
			pointer-events: none;
		}

		.guide {
			pointer-events: none;
			font-size: 14px;
			font-weight: 600;
		}
		
		.popover {
      position: absolute;
			pointer-events: none;
		}
		
		.legendCircle {
			stroke-width:1;
			stroke:#999;
			stroke-dasharray:2 2;
			fill:none;
		}

		.legendLine {
			stroke-width: 1;
			stroke: #D1D1D1;
			shape-rendering: crispEdges;
		}

		.legendTitle {
			fill: #1A1A1A;
			color: #1A1A1A;
			text-anchor: middle;
			font-size: 10px;
		}

		.legendText {
			fill: #949494;
			text-anchor: start;
			font-size: 9px;
		}
		
		@media (min-width: 500px) {
		  .col-sm-3, .col-sm-9 {
			float: left;
		  }
		  .col-sm-9 {
			width: 75%;
		  }
		  .col-sm-3 {
			width: 25%;
		  }
		}
</style>
