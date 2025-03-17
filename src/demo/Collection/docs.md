```ts

<Collection<Selection>
    items={Array.from(selections.values() as IterableIterator<Selection>)}
    item={(item) => (
        <Card.Mini key={item.id} title={item.label}>
            <Button
                className="invisible"
                onClick={() => {
                    if (['test-3', 'test-4'].includes(item.id)) {
                        deleteObject('test-3');
                        deleteObject('test-4');
                    } else {
                        toggleObject(item.id, item);
                    }
                }}
            >
                <Emoji name="close" />
            </Button>
        </Card.Mini>
    )}
/>
