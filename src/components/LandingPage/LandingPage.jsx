import React from 'react';
import { HeroSection } from '../HeroSection/HeroSection';
import { ContextBlock } from '../ContextBlock/ContextBlock';
import { FeatureSpotlight } from '../FeatureSpotlight/FeatureSpotlight';
import { MetricsGrid } from '../MetricsGrid/MetricsGrid';
import { MusicianListingPage } from '../MusicianListingPage/MusicianListingPage';
import styles from './LandingPage.module.css';

export function LandingPage({
  heroProps,
  contextProps,
  primaryFeatureProps,
  secondaryFeatureProps,
  metricsProps,
  listingProps,
  className = '',
  ...props
}) {
  return (
    <div className={[styles.page, className].filter(Boolean).join(' ')} {...props}>
      <HeroSection {...heroProps} />
      
      <ContextBlock {...contextProps} />
      
      <FeatureSpotlight {...primaryFeatureProps} />
      
      <MetricsGrid {...metricsProps} />
      
      <FeatureSpotlight {...secondaryFeatureProps} reverse />
      
      {/* Integrating the previous milestone's component directly into the flow */}
      {listingProps && listingProps.musicians && (
        <MusicianListingPage {...listingProps} />
      )}
    </div>
  );
}

export default LandingPage;
