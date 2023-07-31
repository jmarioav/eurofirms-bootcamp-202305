# Quad

## Introduction

Application that optimize the usage of panels when they are using to obtain small pieces from them.

![](https://media3.giphy.com/media/3wK2VExs30Iofcncac/200w.webp?cid=ecf05e479uhq4os8me8yofvka83sm8mqzwrl360oo2szgbgl&ep=v1_gifs_search&rid=200w.webp&ct=g)

## FDS Functional Description Specification

The application collect a set of blocks with a height and a width, and the width and height of the panel.

Afterthat, it calculates de optimal distribution of the blocks inside the panel optimizing the panel width, and using all the height dimension.

Later, the final distribution solution is given to the user.

### Use cases

#### User
- Define a panel with a set of blocks to place them inside that panel
- Calculate the optimal blocks set distribution inside a panel


### User stories

- Data user CRUD
- Blocks set CRUD
- Panel CRUD
- Optimize Panel

### UI design

- See [Figma](https://www.figma.com/file/uRBDBpz1SmGy3cIrzWglPr/Quad?type=design&mode=design&t=SaMVgz6FNUW6tqIP-1)


## Technical Specs.

### Data model

#### Block
- x: Number (required, default -1)
    - 'x' block position
- y: Number (required, default -1)
    - 'y' block position
- width: Number (required)
    - block width
- height: Number (required)
    - block height
- orientation: Integer (required, enum [0, 1])
    - block rotation

#### Panel
- reference: String (required, default null)
    - panel reference
- owner: ObjectID (required)
    - user that created the panel
- width: Number (required)
    - panel width
- height: Number (required)
    - panel height
- blocks: Block array (defatul [ ])
    - blocks to be placed in the panel
- status: Integer (required, enum [NOT_OPTIMIZED, FINISHED], default NOT_OPTIMIZED)

#### User
- id: ObjectID (unique)
    - user id
- name: String (required)
    - user name
- surname: String (optional)
    - user surname
- zip: String (optional)
    - user postal code
- email: String (required, unique)
    - user email address
- password: String (required, min 3 chars)
    - user password

### Class model

#### Dimension
type of blocks and panels dimensions
- Properties
    - val: BigInt - Value
- Methods
    - value(): Return a Number with the value of dimension
    - isNegative(): Check if dimension is negative
    - isValid2(): Check if dimension if bigger or equal to 2

#### Dimension2D
(Dimension x Dimension) set
- Properties
    - x:BigInt - 1st dimension value
    - y:BigInt - 2nd dimension value
- Methods
    - tr(): Return the transpose
    - add(pos): Return the addition of pos to it
    - intoArea(pos1, pos2): Check if it is between 'pos1' and 'pos2'

#### Block
Item to be placed
- Properties
    - position: Dimension2D - block position (required, default null)
    - size: Dimension2D (required)- block size
    - orientation: Integer enum[REGULAR, ROTATED90] (required, default REGULAR) - block rotation
- Methods
    - isPlace(): Return if block is placed
- Const
    - REGULAR = 0
    - ROTATED90 = 1

#### Panel
Area where items are placed
- Properties
    - reference: String (required, default null) - panel reference
    - owner: ObjectID (required, default null) - user that created the panel
    - size: Dimension2D (required) - panel width and height
    - blocks: Block array (defatul [ ]) - blocks to be placed in the panel
    - status: Integer (required, enum [NOT_OPTIMIZE, FINISHED], default NOT_OPTIMIZE)
- Methods
    - posFree(pos): Check if 'pos' is free in the panel
    - quadFree(pos, quad): Check if quadrant 'quad' is free in 'pos'
- Const
    - QUADRANT_I = 1
    - QUADRANT_II = 2
    - QUADRANT_III = 3
    - QUADRANT_IV = 4
    - NOT_OPTIMIZE = 0
    - FINISHED =1


## Planning

- See GTD & Scrum sections groups in [OneNote](https://1drv.ms/u/s!AlgJZG7mpTRguHg5XiRVQF2W2wKO)