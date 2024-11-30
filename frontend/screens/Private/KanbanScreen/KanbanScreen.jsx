import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import { Temas } from "../../../utils/selectTheme";
import CreatorTask from "../../../components/Modals/CreatorTaskModal/CreatorTaskModal";
import useFetchTasks from "../../../hooks/GetTasks/useFetchTasks";
import { useState } from "react";
import TaskItem from "../../../components/Lists/TaskItem/TaskItem";

const KanbanScreen = () => {
    const {t} = useTranslation();

    const [selected, setSelected] = useState('');
    const [showCreatorTask, setShowCreatorTask] = useState(false);
    
    const { tasks, setTasks } = useFetchTasks();

    const { BackgroundTheme, ColumnBackgroundTheme, BorderColumnTheme } = Temas();

    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{backgroundColor: BackgroundTheme, height: '100%'}}>
              <View style={{ top: 20 }}>
                <Pressable onPress={() => setShowCreatorTask(true)} style={stylesKanban.buttonAdd} android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 250}}>
                    <Text style={stylesKanban.textButtonAdd}>{t('Tool-kanban-button-add')}</Text>
                </Pressable>
                <ScrollView horizontal={true}>

                    <View style={{ gap: 10, flexDirection: 'row', margin: 10}}>

                        <View style={{ backgroundColor: ColumnBackgroundTheme, width: 250, height: 650, padding: 20, borderRadius: 5, borderWidth: 1, borderColor: BorderColumnTheme }}>
                            <Text style={stylesKanban.textColumn}>{t('Column-1')}</Text>
                            {tasks.length === 0 ? (
                            <View style={{ margin: 'auto', justifyContent: 'center', backgroundColor: BackgroundTheme, width: 230, height: 500, alignItems: 'center', left:-10 }}>
                                <Text style={{ color: '#ddd' }}>{t('Not-task-pending')}</Text>
                            </View>
                        ) : (
                            <ScrollView>
                                {tasks.map(task => task.status === 'pending' ? <TaskItem key={task.id} task={task} handleEditTasks={null} setTasks={setTasks} /> : null)}
                            </ScrollView>
                        )}
                        </View>

                        <View style={{ backgroundColor: ColumnBackgroundTheme, width: 250, height: 650, padding: 20, borderRadius: 5, borderWidth: 1, borderColor: BorderColumnTheme }}>
                            <Text style={stylesKanban.textColumn}>{t('Column-2')}</Text>
                            {tasks.length === 0 ? (
                            <View style={{ margin: 'auto', justifyContent: 'center', backgroundColor: BackgroundTheme, width: 230, height: 500, alignItems: 'center', left:-10 }}>
                                <Text style={{ color: '#ddd' }}>{t('Not-task-process')}</Text>
                            </View>
                        ) : (
                            <ScrollView>
                                {tasks.map(task => task.status === 'in progress' ? <TaskItem key={task.id} task={task} handleEditTasks={null} setTasks={setTasks} /> : null)}
                            </ScrollView>
                        )}
                        </View>

                        <View style={{ backgroundColor: ColumnBackgroundTheme, width: 250, height: 650, padding: 20, borderRadius: 5, borderWidth: 1, borderColor: BorderColumnTheme }}>
                            <Text style={stylesKanban.textColumn}>{t('Column-3')}</Text>
                            {tasks.length === 0 ? (
                            <View style={{ margin: 'auto', justifyContent: 'center', backgroundColor: BackgroundTheme, width: 230, height: 500, alignItems: 'center', left:-10 }}>
                                <Text style={{ color: '#ddd' }}>{t('Not-task-finish')}</Text>
                            </View>
                        ) : (
                            <ScrollView>
                                {tasks.map(task => task.status === 'completed' ? <TaskItem key={task.id} task={task} handleEditTasks={null} setTasks={setTasks} /> : null)}
                            </ScrollView>
                        )}
                        </View>

                    </View>
                </ScrollView>
                {showCreatorTask && (
                    <CreatorTask 
                        selected={selected}
                        setSelected={setSelected}
                        setShowCreatorTask={setShowCreatorTask}
                        addTask={(newTask) => {
                            setTasks( prev => [
                            ...prev, newTask
                            ])
                        }}
                    />
                )}
              </View>
            </View>
        </GestureHandlerRootView>

    )
}

const stylesKanban = StyleSheet.create({
    buttonAdd: {
        borderWidth: 1, 
        borderRadius: 5, 
        padding: 10, 
        alignItems: 'center', 
        borderColor: '#ddd', 
        margin: 'auto', 
        width: '90%',
    },

    textButtonAdd: {
        color: '#ddd',
        fontSize: 19
    },
    
    textColumn: {
        color: '#ddd',
        fontSize: 20,
        textAlign: 'center',
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: '#ddd'
    }
})
export default KanbanScreen