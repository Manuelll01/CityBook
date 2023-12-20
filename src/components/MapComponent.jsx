"use client"
// components/Map.jsx

import React, { useState } from 'react'

import Map from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import "mapbox-gl/dist/mapbox-gl.css"
import {
    lightingEffect,
    material,
    INITIAL_VIEW_STATE,
    colorRange,
  } from "../../lib/mapconfig.js";
import { Box } from '@chakra-ui/react'

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
        <Box cursor={'pointer'}>
             <Box>
                <DeckGL
                    effects={[lightingEffect]}
                    initialViewState={initialViewState}
                    controller={true}
                >
                    <Map cursor='pointer'
                    className=""
                    controller={true}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    mapStyle="mapbox://styles/mapbox/outdoors-v11"
                    ></Map>
                </DeckGL>
            </Box>
        </Box>
    )
}