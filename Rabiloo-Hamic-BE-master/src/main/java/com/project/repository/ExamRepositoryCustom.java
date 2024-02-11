package com.project.repository;

import com.project.entity.ExamEntity;
import com.project.entity.QuestionEntity;
import org.hibernate.annotations.QueryHints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ExamRepositoryCustom {
    @Autowired
    private EntityManager entityManager;

    public ExamEntity findExamById(Long examId) {
        ExamEntity exam = entityManager
                .createQuery(
                        "select distinct e " +
                                "from ExamEntity e " +
                                "        left outer join fetch e.questions as questions " +
                                "where e.id = :examId " +
                                "   and e.deleted = false", ExamEntity.class)
                .setParameter("examId", examId)
                .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
                .getSingleResult();

        return fetchAnswersAndImagesForQuestionsInExam(exam);
    }
    public ExamEntity findExamByIdAndCodeNull(Long examId) {
        ExamEntity exam = entityManager
                .createQuery(
                        "select distinct e " +
                                "from ExamEntity e " +
                                "        left outer join fetch e.questions as questions " +
                                "where e.id = :examId " +
                                "   and e.deleted = false " +
                                "   and e.code is null", ExamEntity.class)
                .setParameter("examId", examId)
                .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
                .getSingleResult();

        return fetchAnswersAndImagesForQuestionsInExam(exam);
    }

    private ExamEntity fetchAnswersAndImagesForQuestionsInExam(ExamEntity exam) {
        List<QuestionEntity> questions = entityManager.createQuery("select distinct q " +
                        "from QuestionEntity q " +
                        "left outer join fetch q.answers a " +
                        "where q in :questions", QuestionEntity.class)
                .setParameter("questions", exam.getQuestions())
                .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
                .getResultList();
        var mapAnsByQuestionId = questions.stream()
                .collect(Collectors.toMap(QuestionEntity::getId, QuestionEntity::getAnswers));

        questions = entityManager.createQuery("select distinct q " +
                        "from QuestionEntity q " +
                        "            left outer join fetch q.images img " +
                        "where q in :questions", QuestionEntity.class)
                .setParameter("questions", questions)
                .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
                .getResultList();

        for (QuestionEntity question : questions) {
            question.setAnswers(mapAnsByQuestionId.getOrDefault(question.getId(), new ArrayList<>()));
        }

        exam.setQuestions(questions);

        return exam;
    }
}
