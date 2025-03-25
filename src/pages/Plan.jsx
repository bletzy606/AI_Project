import React from 'react'
import React, { forwardRef } from 'react';


const Plan = () => {
    const plan = forwardRef((props, ref) => {
        return (
          <section ref={ref} id="plan" className="section">
            <h2>plan</h2>
            {/* Your features content */}
          </section>
        );
      });
}

export default Plan
