import React from 'react';
import {compose, withHandlers, withProps, withState} from 'recompose';
import {GoogleMap, TrafficLayer, withGoogleMap, withScriptjs} from 'react-google-maps';
import {MarkerWithLabel} from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import styled from 'styled-components';
import {GeolocationService} from '../services/GeolocationService';

const BaseComponent = props => {
    return [
        <GoogleMap
            key={'map'}
            ref={props.initMap}
            defaultZoom={15}
            defaultCenter={{lat: 0, lng: 0}}
            center={props.position}
        >
            <TrafficLayer autoUpdate/>
            <MarkerWithLabel
                position={{ lat: -34.397, lng: 150.644 }}
                labelAnchor={new window.google.maps.Point(0, 0)} //new google.maps.Point(0, 0)
                labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}
            >
                <div>Hello There!</div>
            </MarkerWithLabel>
        </GoogleMap>,
    ];
};

const enhancer = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB3Ps0avyFnxBzF2Ypyhbpv0VWiaOhgS6I&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `50rem`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withState('position', 'updatePosition', {lat: 0, lng: 0}),
    withHandlers(() => {
        const refs = {
            map: undefined,
        };

        return {
            initMap: ({updatePosition}) => ref => {
                refs.map = ref;
                //const test = new google.maps.Point(0, 0);
                //updatePosition({lat: 39.9693, lng: -86.16500239999999});
                GeolocationService.then(data => {
                    updatePosition(data.location);
                });
            }
        }
    }),
    withScriptjs,
    withGoogleMap,

);

const MapComponent = enhancer(BaseComponent);

const StyledMapComponent = styled(MapComponent)`

`;

export default StyledMapComponent;