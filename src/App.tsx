import { Fragment } from 'react';
import './App.css';
import Shape from './demo/Shape';
import Font from './demo/Font';
import TextInput from './demo/Input/Text';
import Button from './demo/Button';
import Icon from './demo/Icon';
import Hug from './Hug';
import Card from './demo/Card';
import Disclosure from './demo/Disclosure';

const HeartIcon = <Icon label="" name="heart" />;

function App() {
    return (
        <Fragment>
            <div style={{ padding: 'var(--gap-3)' }}>
                <Disclosure summary="Hug">
                    <Font>
                        Breakpoint-aware critical values for layout.{' '}
                        <a href="https://github.com/polmoneys/Hug">Github</a>
                    </Font>
                </Disclosure>
            </div>

            <Hug
                width={{
                    xs: '100%',
                }}
                padding={{
                    xs: 'var(--gap-2)',
                    lg: 'var(--gap-4)',
                }}
                display="grid"
                gap={{ xs: 'var(--gap-4)' }}
            >
                <main>
                    <Hug
                        display="grid"
                        padding={{ xs: 0 }}
                        gap={{ xs: 'var(--gap-2)', md: 'var(--gap-3)' }}
                        gridTemplateColumns={{
                            xs: '1fr',
                            md: '1fr 1fr',
                            lg: '1fr 1fr 1fr 1fr',
                        }}
                    >
                        <aside>
                            <Card ratio="portrait">
                                <Card.Title>
                                    <Font>Lorem ipsun dolor</Font>
                                </Card.Title>
                                <Card.Content>
                                    <Font>
                                        Lorem ipsun dolor sit amet
                                        indisciplinctur gloria at est.{' '}
                                    </Font>
                                </Card.Content>
                                <Card.Actions>
                                    <Button>Add</Button>
                                </Card.Actions>
                            </Card>

                            <Card ratio="portrait">
                                <Card.Title icon={HeartIcon}>
                                    <Font>Lorem ipsun</Font>
                                </Card.Title>
                                <Card.Media
                                    alt="Plant portrait"
                                    src="https://images.unsplash.com/photo-1521206698660-5e077ff6f9c8?q=80&w=2786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                />
                            </Card>

                            <Card.Video
                                ratio="portrait"
                                sources={{
                                    mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
                                }}
                                controls
                            />

                            <Card.VideoPlayer
                                fitInParent
                                width="220px"
                                height="200px"
                                ratio="portrait"
                                sources={{
                                    mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
                                }}
                            />
                        </aside>
                    </Hug>

                    <Hug
                        display="grid"
                        gap={{ xs: 'var(--gap-2)', md: 'var(--gap-3)' }}
                        gridTemplateColumns={{
                            xs: '1fr',
                            md: '1fr 1fr',
                            lg: '1fr 1fr 1fr 1fr',
                        }}
                        padding={{ xs: 0 }}
                    >
                        <Card ratio="landscape">
                            <Card.Title>
                                <Font>Lorem ipsun dolor</Font>
                            </Card.Title>

                            <Card.Actions>
                                <Button>Add</Button>
                            </Card.Actions>
                        </Card>

                        <Card ratio="landscape">
                            <Card.Media
                                alt="Plant landscape"
                                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            />
                            <Card.Title icon={HeartIcon}>
                                <Font>Lorem ipsun</Font>
                            </Card.Title>
                        </Card>

                        <Card.Video
                            ratio="landscape"
                            sources={{
                                mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
                            }}
                            controls
                        />

                        <Card.VideoPlayer
                            // fitInParent
                            width="220px"
                            height="200px"
                            ratio="landscape"
                            sources={{
                                mp4: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
                            }}
                        />
                    </Hug>

                    <div style={{ padding: 'var(--gap-3)' }}>
                        <Disclosure summary="Slots">
                            <Font>
                                Hug one item (think List item or SearchBar...)
                                with `start` or `end` props.
                            </Font>
                        </Disclosure>
                    </div>

                    <Hug
                        gradient="var(--grey-3) 0, var(--grey-3) 100px, var(--grey-4) 100px, var(--grey-4) calc(100% - 100px), var(--grey-2) calc(100% - 100px),var(--grey-2) 100%"
                        start={<Shape.Circle size={48} fill="var(--white)" />}
                        startWidth="100px"
                        end={<Shape.Square size={48} fill="var(--white)" />}
                        endWidth="100px"
                        style={{
                            minHeight: '80px',
                        }}
                    >
                        <Font
                            clamp={2}
                            dangerousStyles={{ padding: '0 var(--gap-2)' }}
                        >
                            Lorem ipsun dolor sit amet indiscliplinctur gloria
                            at eas ulio lamine flick yamal blaugrana el vent.
                            MR. Lu nextflix nein internet good. Lorem ipsun
                            dolor sit amet indiscliplinctur gloria at eas ulio
                            lamine.
                        </Font>
                    </Hug>

                    <Hug
                        gradient="var(--grey-4), var(--grey-4) 100px, transparent 100px,transparent 100%"
                        start={<label>Lorem:</label>}
                        startWidth="100px"
                    >
                        <TextInput
                            placeholder="Type your search..."
                            id="search-slot-a"
                            value=""
                            onChange={(value) => console.log({ value })}
                        />
                    </Hug>
                    <Hug
                        gradient="var(--white), var(--white) calc(100% - 100px), var(--grey-2) calc(100% - 100px),var(--grey-2) 100%"
                        end={
                            <Button dangerousColor="var(--white)" short>
                                Lorem
                            </Button>
                        }
                        endWidth="100px"
                    >
                        <TextInput
                            placeholder="Type your search..."
                            id="search-slot"
                            value=""
                            onChange={(value) => console.log({ value })}
                        />
                    </Hug>
                    <Hug
                        gradient="var(--red) 0, var(--red) 60px, var(--grey-4) 60px,var(--grey-4) calc(100% - 100px), var(--red) calc(100% - 100px),var(--red) 100%"
                        start={
                            <Button.Icon>
                                <Icon name="star" label="" />
                            </Button.Icon>
                        }
                        startWidth="60px"
                        end={
                            <Button.Icon>
                                <Icon name="bookmark" label="" />
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
                </main>
            </Hug>

            <div style={{ padding: 'var(--gap-3)' }}>
                <Disclosure summary="Hug.Us">
                    <Font>
                        Hug two items (or many couples to sync them all)
                    </Font>
                </Disclosure>
            </div>
            <Hug
                padding={{
                    xs: 'var(--gap-2)',
                }}
                display="flex"
                flexDirection="column"
            >
                <form>
                    <Hug gap={{ xs: 'var(--gap-4)' }}>
                        <Hug.Us centered>
                            <label>Search for</label>
                            <TextInput
                                placeholder="Type your search..."
                                id="search"
                                value=""
                                onChange={(value) => console.log({ value })}
                            />
                        </Hug.Us>

                        <Hug.Us dangerous={{ maxWidth: '220px' }}>
                            <label>Search for</label>
                            <TextInput
                                placeholder="Type your search..."
                                id="search"
                                value=""
                                onChange={(value) => console.log({ value })}
                            />
                        </Hug.Us>
                        <Hug.Us dangerous={{ maxWidth: '220px' }} centered>
                            <label>Search for</label>
                            <TextInput
                                placeholder="Type your search..."
                                id="search"
                                value=""
                                onChange={(value) => console.log({ value })}
                            />
                        </Hug.Us>
                    </Hug>
                </form>
            </Hug>

            <div style={{ padding: 'var(--gap-3)' }}>
                <Disclosure summary="Demo details">
                    <Font>
                        Those of you who still find it enjoyable to learn the
                        details of, say, a programming language - being able to
                        happily recite off if NaN equals or does not equal null
                        - you just don't yet understand how utterly fucked the
                        whole thing is. If you think it would be cute to align
                        all of the equals signs in your code, if you spend time
                        configuring your window manager or editor, if put
                        unicode check marks in your test runner, if you add
                        unnecessary hierarchies in your code directories, if you
                        are doing anything beyond just solving the problem - you
                        don't understand how fucked the whole thing is. No one
                        gives a fuck about the glib object model.
                        <br />
                        <Font.Bold inherit as="b">
                            Ryan Dahl
                        </Font.Bold>
                    </Font>
                </Disclosure>
            </div>
        </Fragment>
    );
}

export default App;
