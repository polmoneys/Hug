
```ts
    ✦   ☆   ✦   ☆
✧   ★   H U G   ★   ✧
    ☆   ✦   ☆   ✦
```                            

Harmonious UI Grouping 🤗, `<Hug>`.

[Demo](https://polmoneys.github.io/Hug/) 

`<Hug>` allows for `gridTemplateColumns`, `padding`, `width`, `height` and `gap` breakpoint-aware values by embracing CSS custom properties. Accepts props `display` and `flexDirection` so that you can leverage either CSS grid or CSS flexbox...



## Why Hug

Grouping UI is complex. `<Hug/>` encourages teams to nest less markup and use semantic wrappers while providing *responsive sugar*.

Inspiration:

- [MUI](https://mui.com/) `slots` API and `Box` component. 

## How to Hug

The most virtuous way to `<Hug>` content is by providing your own children wrapper (so we can clone it and keep any element specific attribute you may need), as in:

```ts

<Hug 
    display="grid"  
    gap={{ xs: 'var(--gap-2)', md: 'var(--gap-4)' }}
    gridTemplateColumns={{
        xs: '1fr',
        md: '1fr 1fr',
        lg: '1fr 1fr 1fr',
        xl: '1fr 1fr 1fr 1fr',
    }}>
    <section>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </section>
</Hug>

```

If you don't provide a wrapper but multiple children `<Hug>` will wrap them with a `div` (`component` prop accepts other HTML elements), as in: 


```ts

<Hug 
    component="main"
    display="grid"  
    gridTemplateColumns={{
        xs: '1fr',
        md: '1fr 1fr',
        lg: '1fr 1fr 1fr',
        xl: '1fr 1fr 1fr 1fr',
    }}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
</Hug>

```

Breakpoints can be updated on `hug.module.css`, for reference:

|  BP  |  px  |
|------|------|
| xs   | 600  |
| md   | 960  |
| lg   | 1280 |
| xl   | 1920 |


**Tip:** avoid unnecessary nesting (always flatten your markup as much as possible) or else children `<Hug>` may require some override. 

## Hug one thing

If you provide `start` or `end` prop to `<Hug>` it assumes you wanna append/prepend UI to a horizontal item (think `<List.Item/>`, `<SearchBar/>`...), as in: 

```ts

<Hug
    gradient="var(--red-grey-20) 0, var(--red-grey-20) 60px, var(--grey-4) 60px,var(--grey-4) calc(100% - 100px), var(--grey-2) calc(100% - 100px),var(--grey-2) 100%"
   
   start={
        <Icon name="star"  />
    }
    startWidth="60px"

    end={
        <Button.Icon>
            <Icon name="bookmark"  />
        </Button.Icon>
    }
    endWidth="100px"
>
    <TextInput
        placeholder="Type your search..."
        id="search-slot-2"
        value=""
        onChange={(value) => console.log({ value })}
    />
</Hug>

```

## Options 

```ts

type Unit =
    | 0
    | `var(--${string})`
    | `min(${string})`
    | `max(${string})`
    | `${string}em`
    | `${string}rem`
    | `${string}px`
    | `${string}%`
    | `${string}fr`
    | `${string}vh`
    | `${string}vw`
    | `calc(${string})`;

interface HugProps extends HTMLAttributes<HTMLDivElement> {
    display?: 'grid' | 'flex';
    flexDirection?: 'row' | 'column';
    padding?: ResponsiveProp<Unit>;
    gap?: ResponsiveProp<Unit>;
    width?: ResponsiveProp<Unit>;
    height?: ResponsiveProp<Unit>;
    gridTemplateColumns?: ResponsiveProp<Unit>;
    component?: React.ElementType;
    children?: ReactNode;
}

interface SlotsProps {
    children: string | ReactNode;
    description?: string;
    start?: ReactNode;
    startWidth?: Unit;
    startHeight?: Unit;
    end?: ReactNode;
    endWidth?: Unit;
    endHeight?: Unit;
    gradient?: string;
    style?: Record<string, Unit>;
}


type HugsComponentProps = SlotsProps | HugProps;

```


### Unrelated work

I do not write much about code, last time was [7 years ago](https://polmoneys.github.io/). Funny the subject is kinda of the same. At that time I was creating complex gamified experiences, lots of *Art and Visuals* made of *CSS* at a time where `IE8` was fading out, slowly. These past few years I've been working with financial data, dashboards, complex tables and search filters and what not for a classic Swiss Private Bank. 

One thing I've learned, interfaces are *soft* so we should try to speak about them like them are cute & puffy and meant to be introduced to new people.

Please meet Sparkline [charts](https://github.com/polmoneys/Sparkline) and [StrokeDashOffset](https://github.com/polmoneys/StrokeDashoffset)

### Inspiration 💐

> Our requirements are more modest but at the same time more responsible: 
> buildings, furniture, drinking glasses may well be consumer items that 
> we can destroy without regret after they have served for some short or 
> long period, but while we use them we expect them to fullfill their role and serve us perfectly, so perfectly that we can also derive aesthetic 
> enjoyment from observing them in use. 

Erik Gunnar Asplund on **Swedish Grace**.