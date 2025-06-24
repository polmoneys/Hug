```html


 <!-- The div equivalent to a HTML fieldset -->
    <div role="radiogroup" aria-required="true" aria-labelledby="radios-legend1" aria-describedby="radios-hint1">

      <!-- Or use a <legend> element and drop aria-labelledby -->
      <div id="radios-legend1">Was this article useful? <span class="required">(required)</span></div>

      <div id="radios-hint1" class="radios-hint">Hint text if required</div>

      <div class="radios-group">

        <div class="radio_inp-group">
          <input id="radio_yes1" type="radio" name="radios1" value="Yes">
          <label for="radio_yes1">Yes</label>
        </div>

        <div class="radio_inp-group">
          <input id="radio_no1" type="radio" name="radios1" value="No">
          <label for="radio_no1">No</label>
        </div>

        <div class="radio_inp-group">
          <input id="radio_maybe1" type="radio" name="radios1" value="Maybe">
          <label for="radio_maybe1">Maybe</label>
        </div>

      </div>

      <!-- If theres an error add this id to the aria-describedby attribute on each radio input, and then remove the hidden attribute. -->
      <div hidden id="radios-error1" class="radios-error">Error message when required</div>

    </div>

```


```css


/* Opinionated, but as close to Santander design as easily managed */

[role="radiogroup"] {
  margin: 2rem 0;
}
.required {
  color: #717171;
  font-size: smaller;
}
.radios-hint {
  color: #717171; /* Must meet 4.5:1 colour contrast */
}
.radios-error {
  color: #c00; /* Must meet 3:1 colour contrast */
  margin-top: .5rem;
}
.radios-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Don't increase with font-size zoom */
  margin-top: .5rem;
}
.radio_inp-group > :not([type=radio]) {
  border: 2px solid #888; /* Must meet 3:1 colour contrast */
  border-radius: 4px;
  padding: 8px 16px; /* Don't increase with font-size zoom */
  display: inline-block;
  text-align: center;
  min-width: 5rem;
  cursor: pointer;
}
.radio_inp-group > [type=radio] {
  /* Visually hidden from display, but not from screen-readers */
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.radio_inp-group > [type=radio]:checked + * {
  border-color: green;
  font-weight: bold;
  background-color: #007e001f;
}
.radio_inp-group > [type=radio]:focus-visible + * {
  outline: 2px solid blue;
  outline-offset: 2px;
}


```