#We are going to loop through all the folders under /src/components/exports (these are the components we want to export)
#Then, we will generate one import and export line per component
#This is what shows up in the /lib/ folder

#For example:
#react-library-boilerplate/src/components/exports/PostItNote
#Generates ./lib/PostItNote
#

#import _PostItNote from './PostItNote';
#export { _PostItNote as PostItNote };
#
#Projects using this project as a dependency can just reference the container required
#import { PostItNote } from 'william-chen-disney-exercise';


#This gets compiled by babel into ES5 in the /lib/ folder

EXPORT_FILE='william-chen-disney-ui-exercise.js'
EXPORT_DIRECTORY="./src/components/exports/*/"

> $EXPORT_FILE

for dir in $EXPORT_DIRECTORY
do
	echo $dir
    dir=${dir%*/}
    echo import _${dir##*/} from \'./exports/${dir##*/}\'\; >> $EXPORT_FILE
    echo export \{ _${dir##*/}\ as ${dir##*/} \}\; >> $EXPORT_FILE
done
