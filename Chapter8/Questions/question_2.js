const allTasks = {
    date: "2017-09-22",
    byPerson: [{
            responsible: "EG",
            tasks: [{
                    id: 111,
                    desc: "task 111",
                    done: false
                },
                {
                    id: 222,
                    desc: "task 222",
                    done: false
                }
            ]
        },
        {
            responsible: "FK",
            tasks: [{
                    id: 555,
                    desc: "task 555",
                    done: false
                },
                {
                    id: 777,
                    desc: "task 777",
                    done: true
                },
                {
                    id: 999,
                    desc: "task 999",
                    done: false
                },
            ]
        },
        {
            responsible: "FK",
            tasks: [{
                id: 444,
                desc: "task 444",
                done: true
            }]
        }
    ]
}

// Your goal is to produce an array with the IDs of the pending tasks for a given person, identified by name, which should match the >responsible< field.

const filterTasksByResponsibleField = responsibleField => tasks => tasks.byPerson.filter(task => task.responsible === responsibleField);
const filterTasksByResponsibleFieldFK = filterTasksByResponsibleField("FK");
const getTasksForEachPerson = people => people.map(person => person.tasks);
const getPendingTasksId = responsibleFieldTasksArray => responsibleFieldTasksArray.reduce(
    (accumulator, currentTasksArray) => 
        (
            accumulator.push(
                ...(
                    currentTasksArray
                        .filter(task => task.done === false)
                        .reduce(
                            (idsAccumulator, task) => (idsAccumulator.push(task.id), idsAccumulator),
                            []
                        )
                )
            ),
            accumulator
        ),
    []
);

// compose => (f, g, h) => value => f(g(h(value)));
const compose = (...fns) => value =>
    fns.reduceRight(
        (accumulator, currentFn) => currentFn(accumulator),
        value
    )

const getPendingIdTasksArrayByResponsibleField = compose(
    getPendingTasksId,
    getTasksForEachPerson,
    filterTasksByResponsibleFieldFK
);

const result = getPendingIdTasksArrayByResponsibleField(allTasks);
console.log(result);