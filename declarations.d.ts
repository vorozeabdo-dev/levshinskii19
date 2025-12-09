declare module '@pbe/react-yandex-maps' {
    import React from 'react';

    export interface YMapsProps {
        query?: {
            lang?: string;
            apikey?: string;
            ns?: string;
            load?: string;
            [key: string]: any;
        };
        children?: React.ReactNode;
    }

    export const YMaps: React.FC<YMapsProps>;

    export interface MapProps {
        state?: {
            center?: number[];
            zoom?: number;
            [key: string]: any;
        };
        options?: {
            [key: string]: any;
        };
        width?: string | number;
        height?: string | number;
        className?: string;
        style?: React.CSSProperties;
        defaultState?: any;
        defaultOptions?: any;
        modules?: string[];
        instanceRef?: (ref: any) => void;
        children?: React.ReactNode;
    }

    export const Map: React.FC<MapProps>;

    export interface PlacemarkProps {
        geometry?: number[];
        properties?: any;
        options?: any;
        modules?: string[];
        instanceRef?: (ref: any) => void;
        children?: React.ReactNode;
    }

    export const Placemark: React.FC<PlacemarkProps>;

    export interface ZoomControlProps {
        options?: any;
        defaultOptions?: any;
        instanceRef?: (ref: any) => void;
    }

    export const ZoomControl: React.FC<ZoomControlProps>;

    // Add other exports as needed
    export const Clusterer: React.FC<any>;
    export const GeolocationControl: React.FC<any>;
    export const RouteButton: React.FC<any>;
    export const SearchControl: React.FC<any>;
    export const TrafficControl: React.FC<any>;
    export const TypeSelector: React.FC<any>;
    export const FullscreenControl: React.FC<any>;
    export const RulerControl: React.FC<any>;
}
