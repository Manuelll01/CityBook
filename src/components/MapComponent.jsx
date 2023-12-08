"use client"
// components/Map.jsx

import React, { useState } from 'react'

import Map from 'react-map-gl'
import { HexagonLayer } from '@deck.gl/aggregation-layers'
import DeckGL from '@deck.gl/react'
import "mapbox-gl/dist/mapbox-gl.css"
import {
    lightingEffect,
    material,
    INITIAL_VIEW_STATE,
    colorRange,
  } from "../../lib/mapconfig.js";

export const MapComponent = ({ latitude, longitude }) => {

    const initialViewState = {
        longitude: longitude || INITIAL_VIEW_STATE.longitude,
        latitude: latitude || INITIAL_VIEW_STATE.latitude,
        zoom: INITIAL_VIEW_STATE.zoom,
        minZoom: INITIAL_VIEW_STATE.minZoom,
        maxZoom: INITIAL_VIEW_STATE.maxZoom,
        pitch: INITIAL_VIEW_STATE.pitch,
        bearing: INITIAL_VIEW_STATE.bearing,
      };

    return(
        <div>
             <div>
                <DeckGL
                    effects={[lightingEffect]}
                    initialViewState={initialViewState}
                    controller={true}
                >
                    <Map
                    className=""
                    controller={true}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    mapStyle="mapbox://styles/petherem/cl2hdvc6r003114n2jgmmdr24"
                    ></Map>
                </DeckGL>
            </div>
        </div>
    )
}