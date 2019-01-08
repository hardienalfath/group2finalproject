<?xml version="1.0" encoding="ISO-8859-1"?>
    <StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
      xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
      <NamedLayer>
        <Name>artificial surface</Name>
        <UserStyle>
          <Name>artificial surface</Name>
          <Title>artificial surface icon</Title>
          <Abstract>A sample of artificial surface icon</Abstract>

          <FeatureTypeStyle>
            <Rule>
       <Name>Large</Name>
       <MaxScaleDenominator>200000</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <ExternalGraphic>
               <OnlineResource xlink:type="simple" xlink:href="building.png" />
               <Format>image/png</Format>               
             </ExternalGraphic>
           <Size>35</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
			<Rule>
       <Name>Medium</Name>
       <MinScaleDenominator>200000</MinScaleDenominator>
       <MaxScaleDenominator>500000</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
             <ExternalGraphic>
               <OnlineResource xlink:type="simple" xlink:href="building.png" />
               <Format>image/png</Format>
             </ExternalGraphic>
           <Size>20</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name>Small</Name>
       <MinScaleDenominator>500000</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <ExternalGraphic>
               <OnlineResource xlink:type="simple" xlink:href="building.png" />
               <Format>image/png</Format>
             </ExternalGraphic>           
           <Size>2</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
          </FeatureTypeStyle>
        </UserStyle>
      </NamedLayer>
    </StyledLayerDescriptor>